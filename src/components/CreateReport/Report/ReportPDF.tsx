import { Document, Page, View, StyleSheet } from '@react-pdf/renderer';
import TimeframeOfInformationReviewPDF from './components/TimeframeOfInformationReview.pdf';
import ActionsOutcomesImpactsReviewPDF from './components/ActionsOutcomesImpactsReview.pdf';
import ProgressOfTargetsReviewPDF from './components/ProgressOfTargetsReview.pdf';
import ChallengesAndOpportunitiesReviewPDF from './components/ChallengesAndOpportunitiesReview.pdf';
import type { TProgressReportingShape } from '@app/types';

interface ReportPDFProps {
  data: TProgressReportingShape;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11
  },
  section: {
    marginBottom: 20
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginVertical: 20
  }
});

const ReportPDF = ({ data }: ReportPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <TimeframeOfInformationReviewPDF data={data} />
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <ActionsOutcomesImpactsReviewPDF data={data} />
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <ProgressOfTargetsReviewPDF data={data} />
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <ChallengesAndOpportunitiesReviewPDF data={data} />
      </View>
    </Page>
  </Document>
);

export default ReportPDF;
