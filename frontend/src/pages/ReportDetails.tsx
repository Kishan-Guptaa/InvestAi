import { useNavigate } from 'react-router-dom';
import { ReportView } from '../components/sections/ReportView';
import { AIChatAssistant } from '../components/chat/AIChatAssistant';

export default function ReportDetails({ analysisState }: any) {
  const { report, setReport, customApiKey } = analysisState;
  const navigate = useNavigate();

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">No report selected</h2>
        <p className="text-zinc-500 mb-8 font-medium">Please search for a company first to generate a report.</p>
        <button 
          onClick={() => navigate('/search')}
          className="swiss-button-primary"
        >
          START NEW ANALYSIS
        </button>
      </div>
    );
  }

  const handleReset = () => {
    setReport(null);
    navigate('/search');
  };

  return (
    <>
      <ReportView report={report} onReset={handleReset} />
      <AIChatAssistant context={report} customApiKey={customApiKey} />
    </>
  );
}
