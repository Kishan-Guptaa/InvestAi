import { Request, Response, NextFunction } from 'express';
import { langchainService } from '../services/langchainService';
import { config } from '../config';
import { prisma } from '../config/db';
import { AuthRequest } from '../middlewares/authMiddleware';
import YahooFinance from 'yahoo-finance2';

const yahooFinance = new (YahooFinance as any)();

export class AnalyzeController {
  /**
   * Controller for processing the analysis requests.
   * Extracts input parameters, validates credentials, and manages the lifecycle of the response.
   */
  public analyze = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { company, apiKey } = req.body;
      const headerKey = req.headers['x-google-api-key'] as string;
      const activeKey = apiKey || headerKey || config.googleApiKey;
      const trimmedCompany = company?.trim();

      if (!trimmedCompany) {
        res.status(400).json({ status: 'error', code: 'EMPTY_INPUT', message: 'Company name is required.' });
        return;
      }
      if (!activeKey) {
        res.status(400).json({ status: 'error', code: 'MISSING_API_KEY', message: 'API key is missing.' });
        return;
      }

      const report = await langchainService.analyzeLegacy(trimmedCompany, activeKey);
      res.status(200).json({ status: 'success', data: report });
    } catch (error: any) {
      next(error);
    }
  };

  public getQuote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { ticker } = req.params;
      const result = await yahooFinance.quoteSummary(ticker, { modules: ['price', 'assetProfile'] }) as any;
      
      const price = result.price?.regularMarketPrice;
      const currency = result.price?.currencySymbol || '$';
      const city = result.assetProfile?.city || '';
      const country = result.assetProfile?.country || '';
      const hq = [city, country].filter(Boolean).join(', ') || 'N/A';

      res.status(200).json({ 
        status: 'success', 
        data: {
          price: price ? `${currency}${price.toFixed(2)}` : 'N/A',
          hq: hq
        }
      });
    } catch (error) {
      console.error('Yahoo Finance Error:', error);
      res.status(200).json({ status: 'success', data: null });
    }
  };

  private getActiveKey(req: Request) {
    return req.body.apiKey || req.headers['x-google-api-key'] || config.googleApiKey;
  }

  public analyzeCompany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const key = this.getActiveKey(req);
      if (!key) throw new Error("Missing API Key");
      const data = await langchainService.analyzeCompany(req.body.company, key);
      res.status(200).json({ status: 'success', data });
    } catch (error) { next(error); }
  };

  public analyzeFinance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const key = this.getActiveKey(req);
      if (!key) throw new Error("Missing API Key");
      const data = await langchainService.analyzeFinance(req.body.company, key);
      res.status(200).json({ status: 'success', data });
    } catch (error) { next(error); }
  };

  public analyzeNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const key = this.getActiveKey(req);
      if (!key) throw new Error("Missing API Key");
      const data = await langchainService.analyzeNews(req.body.company, key);
      res.status(200).json({ status: 'success', data });
    } catch (error) { next(error); }
  };

  public analyzeSwot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const key = this.getActiveKey(req);
      if (!key) throw new Error("Missing API Key");
      const data = await langchainService.analyzeSwot(req.body.company, key);
      res.status(200).json({ status: 'success', data });
    } catch (error) { next(error); }
  };

  public analyzeRisk = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const key = this.getActiveKey(req);
      if (!key) throw new Error("Missing API Key");
      const data = await langchainService.analyzeRisk(req.body.company, key);
      res.status(200).json({ status: 'success', data });
    } catch (error) { next(error); }
  };

  public analyzeRecommendation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const key = this.getActiveKey(req);
      if (!key) throw new Error("Missing API Key");
      const data = await langchainService.analyzeRecommendation(req.body.company, JSON.stringify(req.body.context), key);
      res.status(200).json({ status: 'success', data });
    } catch (error) { next(error); }
  };

  public saveReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authReq = req as AuthRequest;
      const userId = authReq.auth?.userId;
      const { report } = req.body;

      if (!userId) {
        res.status(401).json({ status: 'error', message: 'Unauthorized access.' });
        return;
      }

      const saved = await prisma.analysis.create({
        data: {
          userId,
          companyName: report.overview.companyName,
          ticker: report.overview.ticker,
          action: report.recommendation.action,
          score: report.recommendation.investmentScore,
          reportJson: report as any
        }
      });

      res.status(200).json({ status: 'success', data: saved });
    } catch (error) { next(error); }
  };

  /**
   * Fetch a single report by ID (Public)
   */
  public getSharedReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ status: 'error', message: 'Report ID is required.' });
        return;
      }

      const report = await prisma.analysis.findUnique({
        where: { id }
      });

      if (!report) {
        res.status(404).json({ status: 'error', message: 'Report not found.' });
        return;
      }

      res.status(200).json({ status: 'success', data: report });
    } catch (error) { next(error); }
  };

  public analyzeChat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const key = this.getActiveKey(req);
      if (!key) throw new Error("Missing API Key");
      const { question, context } = req.body;
      const data = await langchainService.chat(question, JSON.stringify(context), key);
      res.status(200).json({ status: 'success', data });
    } catch (error) { next(error); }
  };

  /**
   * Fetch analysis history from DB for the authenticated user
   */
  public history = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authReq = req as AuthRequest;
      const userId = authReq.auth?.userId;

      if (!userId) {
        res.status(401).json({
          status: 'error',
          message: 'Unauthorized access.'
        });
        return;
      }

      const list = await prisma.analysis.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 20
      });

      // Map to history list format expected by React client
      const formatted = list.map((item) => ({
        id: item.id,
        companyName: item.companyName,
        ticker: item.ticker,
        action: item.action as 'INVEST' | 'PASS',
        investmentScore: item.score,
        timestamp: item.createdAt.toISOString(),
        report: item.reportJson
      }));

      res.status(200).json({
        status: 'success',
        data: formatted
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete a specific analysis from database for the authenticated user
   */
  public deleteHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authReq = req as AuthRequest;
      const userId = authReq.auth?.userId;
      const { id } = req.params;

      if (!userId) {
        res.status(401).json({
          status: 'error',
          message: 'Unauthorized access.'
        });
        return;
      }

      // Check if audit exists and belongs to the user
      const existing = await prisma.analysis.findFirst({
        where: { id, userId }
      });

      if (!existing) {
        res.status(404).json({
          status: 'error',
          message: 'Analysis record not found or permission denied.'
        });
        return;
      }

      await prisma.analysis.delete({
        where: { id }
      });

      res.status(200).json({
        status: 'success',
        message: 'Record successfully deleted.'
      });
    } catch (error) {
      next(error);
    }
  };
}

export const analyzeController = new AnalyzeController();
