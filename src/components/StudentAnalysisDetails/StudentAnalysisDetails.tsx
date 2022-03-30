import {AnalysisStudentAssignmentsDetails, Student} from '../../types';
import {analysisTypeNegative, analysisTypeNeutral, analysisTypePositive} from '../../constants';

type AnalysisProps = {
  analysis: AnalysisStudentAssignmentsDetails,
  student?: Student
}

const StudentAnalysisDetails = ({analysis, student}: AnalysisProps) => {
  return (
    <div>
      {analysis.details.filter(detail => detail.type !== analysisTypeNeutral).length > 0 &&
        <>
          <h3 className={'text-lg font-semibold my-4'}>{student?.name}</h3>
          <ul className={'flex flex-col gap-4'}>
            {analysis.details.filter(detail => detail.type !== analysisTypeNeutral).map((detail, index) =>
              <li key={`analysis-details-${index}`} className={`p-3 border ${detail.type === analysisTypeNegative ? 'border-red-400' : detail.type === analysisTypePositive ? 'border-blue-400' : 'border-gray-400'} rounded-lg`}>
                <p>{detail.results}</p>
              </li>
            )}
          </ul>
        </>
      }
    </div>
  );
};

export default StudentAnalysisDetails;
