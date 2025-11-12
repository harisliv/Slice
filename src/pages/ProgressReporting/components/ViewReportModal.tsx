import { useSelectedReport, useActiveInitiative } from '@app/hooks';
import { DownloadExportIcon } from '@app/lib/icons';
import { ButtonComponent, SkeletonComponent } from '@app/lib/ui';
import { Modal } from '@app/lib/ui';
import { Report } from '@app/components';
import ReportPDF from '@app/components/CreateReport/Report/ReportPDF';
import {
  defaultProgressReportingFormValues,
  type TProgressReportingShape
} from '@app/types';
import { Box } from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import dayjs from 'dayjs';

interface ViewReportModalProps {
  reportId: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ViewReportModal({
  reportId,
  isModalOpen,
  setIsModalOpen
}: ViewReportModalProps) {
  const { activeInitiative } = useActiveInitiative();

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const { data: selectedReport, isLoading } = useSelectedReport({
    id: reportId
  });

  const fullData: TProgressReportingShape = {
    ...defaultProgressReportingFormValues,
    ...(selectedReport ?? {}),
    actions:
      selectedReport?.actions?.map((action) => ({
        ...action,
        associatedTargets: action.associatedTargets?.map((target) => target)
      })) || []
  };

  const fileName = `${activeInitiative?.name.replace(
    / /g,
    '-'
  )}_Progress_${dayjs().year()}.pdf`;

  return (
    <Modal
      $width="768px"
      keepMounted={false}
      modalTitle="View report"
      onClose={() => setIsModalOpen(false)}
      open={isModalOpen}
      justifyFooterChildren="space-between"
      footerChildren={
        <>
          <PDFDownloadLink
            key={Date.now()}
            document={<ReportPDF data={fullData} />}
            fileName={fileName}
          >
            {({ loading }) => (
              <ButtonComponent
                startIcon={<DownloadExportIcon />}
                customVariant="terciary-m"
                disabled={loading}
              >
                Download as a PDF
              </ButtonComponent>
            )}
          </PDFDownloadLink>
          <ButtonComponent customVariant="secondary-m" onClick={handleClose}>
            Close
          </ButtonComponent>
        </>
      }
    >
      {isLoading ? (
        <Box sx={{ padding: '80px 0' }}>
          <SkeletonComponent />
        </Box>
      ) : (
        <Report data={fullData} />
      )}
    </Modal>
  );
}
