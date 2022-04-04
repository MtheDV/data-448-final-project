import {AnalysisStudentAssignmentsDetails, Student} from '../../types';
import {analysisTypeNegative, analysisTypeNeutral, analysisTypePositive} from '../../constants';
import {Dispatch, SetStateAction} from 'react';

type AnalysisProps = {
  analysis: AnalysisStudentAssignmentsDetails,
  student?: Student,
  setSelectedStudentFromAnalysis: Dispatch<SetStateAction<number | undefined>>
}

const StudentAnalysisDetails = ({analysis, student, setSelectedStudentFromAnalysis}: AnalysisProps) => {
  const setSelected = () => {
    setSelectedStudentFromAnalysis(student?.id);
  };
  
  return (
    <div>
      {analysis.details.filter(detail => detail.type !== analysisTypeNeutral).length > 0 &&
        <>
          <h3 className={'text-lg font-semibold mb-4'}>{student?.name}</h3>
          <ul className={'flex flex-col gap-4'}>
            {analysis.details.filter(detail => detail.type !== analysisTypeNeutral).map((detail, index) =>
              <li key={`analysis-details-${index}`}>
                <button
                  className={`text-left p-3 border ${detail.type === analysisTypeNegative ? 'border-red-400' : detail.type === analysisTypePositive ? 'border-green-600' : 'border-gray-400'} rounded-lg hover:bg-gray-100 hover:shadow`}
                  onClick={setSelected}
                >
                  <p>{detail.results}</p>
                </button>
              </li>
            )}
          </ul>
        </>
      }
    </div>
  );
};

export default StudentAnalysisDetails;
