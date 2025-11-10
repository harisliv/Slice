import dayjs from 'dayjs';
import { useSubmittedReports } from './useSubmittedReports';
import { useModalStore } from './Modal';
import { useMemo } from 'react';

export const useSubmissionPeriodCheck = (data: any) => {
  const { data: submittedReports } = useSubmittedReports(!!data.startDate);
  const { showModal, hideModal } = useModalStore();

  const validationState = useMemo(() => {
    if (!data.startDate) {
      return {
        canSubmit: true,
        hasSubmittedReportThisYear: false,
        isOutsideSubmissionPeriod: false
      };
    }

    const currentMonth = dayjs().month();
    const currentDay = dayjs().date();
    const currentYear = dayjs().year();

    const isOutsideSubmissionPeriod =
      currentMonth !== 8 || currentDay < 1 || currentDay > 30;

    const hasSubmittedReportThisYear = submittedReports?.some(
      (report) =>
        dayjs(report.draftLatestUpdate, 'DD-MM-YYYY').year() === currentYear
    );

    return {
      canSubmit: !isOutsideSubmissionPeriod && !hasSubmittedReportThisYear,
      hasSubmittedReportThisYear,
      isOutsideSubmissionPeriod
    };
  }, [data.startDate, submittedReports]);

  const showSubmissionModal = () => {
    if (validationState.isOutsideSubmissionPeriod) {
      showModal({
        title: 'Attention!',
        subtitle: 'Submission report',
        content:
          'A Cooperative Climate Initiative can submit one progress report per year during the submission period (1 September 0:00 CET - 30 September 23:59 CET). Please contact the secretariat for further support.',
        buttons: [
          {
            text: 'OK',
            action: () => {
              hideModal();
            }
          }
        ]
      });

      return;
    }

    if (validationState.hasSubmittedReportThisYear) {
      showModal({
        title: 'Attention!',
        subtitle: 'Submission report',
        content:
          'A Cooperative Climate Initiative can submit one progress report per year during the submission period (1 September 0:00 CET - 30 September 23:59 CET). Please contact the secretariat for further support.',
        buttons: [
          {
            text: 'OK',
            action: () => {
              hideModal();
            }
          }
        ]
      });
    }
  };

  return { canSubmit: validationState.canSubmit, showSubmissionModal };
};
