import { ScrollText, FileText, Info, CheckCircle2 } from "lucide-react"; // Swapped out lucide-react-native

const DeclarationPage = () => {
  return (
    <div className="flex flex-col min-h-[80vh] w-full justify-center items-center px-5 bg-gray-50 text-gray-900">
      {/* Icon Capsule Banner */}
      <div className="mb-8 p-6 bg-white rounded-full shadow-md animate-bounce duration-1000">
        <ScrollText className="w-20 h-20 text-[#2980b9]" />
      </div>

      {/* Main Feature Heading */}
      <h2 className="text-3xl font-extrabold text-gray-800 mb-4 text-center tracking-tight">
        Declaration Feature Coming Soon
      </h2>

      {/* Subheading Badging status */}
      <div className="flex items-center mb-6 space-x-2 bg-green-50 px-4 py-1.5 rounded-full border border-green-200">
        <FileText className="w-5 h-5 text-[#27ae60]" />
        <span className="text-base text-green-700 font-semibold tracking-wide">
          Under Development
        </span>
      </div>

      {/* Informational Message Context */}
      <p className="text-base text-gray-500 text-center leading-relaxed max-w-md mb-8">
        The declaration management feature will be available in a future update.
        Soon, you will be able to review, verify, and manage all student and
        parent declarations for the academic year here.
      </p>

      {/* Side Information Feature Panel Checklist */}
      <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-sm border border-gray-100 space-y-4">
        {/* Row Item 1 */}
        <div className="flex items-start space-x-3">
          <CheckCircle2 className="w-5 h-5 text-[#27ae60] shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600 leading-normal">
            All declarations must be approved before admission is finalized.
          </p>
        </div>

        {/* Row Item 2 */}
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-[#2980b9] shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600 leading-normal">
            Stay tuned for updates in upcoming releases.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeclarationPage;
