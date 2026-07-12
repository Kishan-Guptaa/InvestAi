import { InvestmentReport } from '../types';

/**
 * Generates and prints a clean, beautifully formatted Swiss-design PDF layout.
 */
export function exportReportToPDF(report: InvestmentReport) {
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    alert('Please allow popups to export the report as PDF.');
    return;
  }

  const { overview, financials, swot, risks, recommendation } = report;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>InvestIQ AI — ${overview.companyName} (${overview.ticker}) Report</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: 'Inter', sans-serif;
            color: #000000;
            background: #ffffff;
            line-height: 1.4;
            padding: 40px;
            font-size: 11px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
          }
          
          /* Header Styles */
          .header-table {
            width: 100%;
            border-bottom: 2px solid #000000;
            padding-bottom: 16px;
            margin-bottom: 24px;
          }
          .title {
            font-size: 28px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: -1px;
            line-height: 1.1;
          }
          .subtitle {
            font-size: 12px;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.5px;
            color: #D8232A;
            margin-top: 2px;
          }
          .tag-confidential {
            background: #000000;
            color: #ffffff;
            padding: 2px 6px;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            display: inline-block;
          }
          .date {
            font-size: 9px;
            color: #52525b;
            margin-top: 4px;
            text-align: right;
          }
          
          /* Meta Grid */
          .meta-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 1px solid #e4e4e7;
          }
          .meta-label {
            font-size: 8px;
            font-weight: 700;
            text-transform: uppercase;
            color: #71717a;
            margin-bottom: 2px;
          }
          .meta-value {
            font-size: 12px;
            font-weight: 700;
          }
          
          /* Banner */
          .banner {
            border: 2px solid #000000;
            padding: 16px;
            margin-bottom: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .banner-action-title {
            font-size: 9px;
            font-weight: 700;
            text-transform: uppercase;
            color: #71717a;
            margin-bottom: 2px;
          }
          .banner-action {
            font-size: 24px;
            font-weight: 900;
            color: ${recommendation.action === 'INVEST' ? '#D8232A' : '#000000'};
          }
          .scores {
            display: flex;
            gap: 32px;
          }
          .score-item {
            text-align: right;
          }
          .score-num {
            font-size: 20px;
            font-weight: 900;
          }
          
          /* Sections */
          .section {
            margin-bottom: 24px;
            page-break-inside: avoid;
          }
          .section-title {
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
            border-bottom: 1px solid #000000;
            padding-bottom: 4px;
            margin-bottom: 12px;
            letter-spacing: 0.5px;
          }
          .thesis-box {
            font-size: 12px;
            line-height: 1.5;
            font-weight: 500;
            margin-bottom: 12px;
          }
          .summary-box {
            background: #f4f4f5;
            padding: 12px;
            border-left: 3px solid #D8232A;
            font-style: italic;
          }
          
          /* Lists */
          .bullet-list {
            list-style: none;
          }
          .bullet-list li {
            position: relative;
            padding-left: 12px;
            margin-bottom: 4px;
          }
          .bullet-list li::before {
            content: "■";
            position: absolute;
            left: 0;
            top: 3px;
            font-size: 6px;
            color: #D8232A;
          }
          
          /* Grids */
          .two-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
          .card {
            border: 1px solid #e4e4e7;
            padding: 12px;
          }
          .card h4 {
            font-size: 9px;
            font-weight: 800;
            text-transform: uppercase;
            border-bottom: 1px solid #e4e4e7;
            padding-bottom: 4px;
            margin-bottom: 8px;
          }
          
          /* Table */
          .risk-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
          }
          .risk-table th {
            text-align: left;
            border-bottom: 2px solid #000000;
            padding: 6px 4px;
            font-size: 8px;
            text-transform: uppercase;
            color: #71717a;
          }
          .risk-table td {
            padding: 6px 4px;
            border-bottom: 1px solid #e4e4e7;
            vertical-align: top;
          }
          
          .footer {
            border-top: 1px solid #e4e4e7;
            padding-top: 12px;
            font-size: 8px;
            color: #71717a;
            text-align: center;
            margin-top: 40px;
          }
          
          @media print {
            body {
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <table class="header-table" style="width: 100%;">
            <tr>
              <td>
                <h1 class="title">${overview.companyName}</h1>
                <div class="subtitle">InvestIQ AI Research Document</div>
              </td>
              <td style="text-align: right; vertical-align: top;">
                <span class="tag-confidential">CONFIDENTIAL</span>
                <div class="date">Report Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </td>
            </tr>
          </table>

          <!-- Meta Information -->
          <div class="meta-grid">
            <div>
              <div class="meta-label">Stock Ticker</div>
              <div class="meta-value">${overview.ticker}</div>
            </div>
            <div>
              <div class="meta-label">Primary Sector</div>
              <div class="meta-value">${overview.industry}</div>
            </div>
            <div>
              <div class="meta-label">Market Capitalization</div>
              <div class="meta-value">${overview.marketCap}</div>
            </div>
            <div>
              <div class="meta-label">Risk Classification</div>
              <div class="meta-value" style="color: ${risks.level === 'High' ? '#D8232A' : '#000000'};">${risks.level.toUpperCase()}</div>
            </div>
          </div>

          <!-- Recommendation Banner -->
          <div class="banner">
            <div>
              <div class="banner-action-title">Investment Verdict</div>
              <div class="banner-action">${recommendation.action}</div>
            </div>
            <div class="scores">
              <div class="score-item">
                <div class="meta-label">Investment Quality</div>
                <div class="score-num">${recommendation.investmentScore}/100</div>
              </div>
              <div class="score-item">
                <div class="meta-label">Analyst Confidence</div>
                <div class="score-num">${recommendation.confidenceScore}%</div>
              </div>
            </div>
          </div>

          <!-- Thesis & Executive Summary -->
          <div class="section">
            <div class="section-title">Investment Thesis</div>
            <div class="thesis-box">${recommendation.reasoning}</div>
            <div class="summary-box">
              <div class="meta-label" style="color: #D8232A;">Summary Thesis</div>
              <p>${recommendation.finalSummary}</p>
            </div>
          </div>

          <!-- Business Overview & Moat -->
          <div class="section">
            <div class="section-title">Business Profile & Economic Moat</div>
            <p style="margin-bottom: 8px;">${overview.description}</p>
            <div style="margin-bottom: 12px;">
              <span class="meta-label">Operational Strategy</span>
              <p>${overview.businessModel}</p>
            </div>
            <div>
              <span class="meta-label">Economic Moats & Core Moats</span>
              <ul class="bullet-list" style="margin-top: 4px;">
                ${overview.competitiveAdvantages.map(adv => `<li>${adv}</li>`).join('')}
              </ul>
            </div>
          </div>

          <!-- Financial Performance Analysis -->
          <div class="section">
            <div class="section-title">Financial Quality Assessment</div>
            <div class="two-col" style="margin-bottom: 12px;">
              <div class="card">
                <h4>Growth & Scale</h4>
                <p>${financials.revenueTrend}</p>
                <p style="margin-top: 4px;"><strong>YoY Performance:</strong> ${financials.growth}</p>
              </div>
              <div class="card">
                <h4>Profitability Profile</h4>
                <p>${financials.profitability}</p>
                <p style="margin-top: 4px;"><strong>Leverage Index:</strong> ${financials.debt}</p>
              </div>
            </div>
            <div class="card">
              <h4>Free Cash Flow & Allocations</h4>
              <p>${financials.cashFlow}</p>
            </div>
          </div>

          <!-- SWOT Grid -->
          <div class="section" style="page-break-before: always; padding-top: 24px;">
            <div class="section-title">SWOT Assessment Matrix</div>
            <div class="two-col" style="margin-bottom: 16px;">
              <div class="card">
                <h4 style="color: #000000;">Strengths (Internal)</h4>
                <ul class="bullet-list">
                  ${swot.strengths.map(s => `<li>${s}</li>`).join('')}
                </ul>
              </div>
              <div class="card">
                <h4 style="color: #000000;">Weaknesses (Internal)</h4>
                <ul class="bullet-list">
                  ${swot.weaknesses.map(w => `<li>${w}</li>`).join('')}
                </ul>
              </div>
            </div>
            <div class="two-col">
              <div class="card">
                <h4 style="color: #000000;">Opportunities (External)</h4>
                <ul class="bullet-list">
                  ${swot.opportunities.map(o => `<li>${o}</li>`).join('')}
                </ul>
              </div>
              <div class="card">
                <h4 style="color: #000000;">Threats (External)</h4>
                <ul class="bullet-list">
                  ${swot.threats.map(t => `<li>${t}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>

          <!-- Risk Profile -->
          <div class="section">
            <div class="section-title">Risk Exposure Matrix</div>
            <table class="risk-table">
              <thead>
                <tr>
                  <th style="width: 140px;">Category</th>
                  <th>Analysis & Risk Description</th>
                </tr>
              </thead>
              <tbody>
                ${risks.details.map(risk => `
                  <tr>
                    <td style="font-weight: 700;">${risk.category}</td>
                    <td>${risk.description}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Core Pros and Cons -->
          <div class="section">
            <div class="section-title">Key Decision Factors</div>
            <div class="two-col">
              <div class="card">
                <h4 style="color: #000000;">Supporting Arguments (Pros)</h4>
                <ul class="bullet-list">
                  ${recommendation.pros.map(pro => `<li>${pro}</li>`).join('')}
                </ul>
              </div>
              <div class="card">
                <h4 style="color: #000000;">Counter Arguments (Cons)</h4>
                <ul class="bullet-list">
                  ${recommendation.cons.map(con => `<li>${con}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p>Disclaimer: This automated research document is synthesized by an artificial intelligence analyst and does not constitute regulated financial advisory services. All investment evaluations carry execution risk.</p>
            <p style="margin-top: 4px;">InvestIQ AI — Powering Intelligent Financial Decisions.</p>
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 600);
          }
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
