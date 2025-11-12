import { Text, View, StyleSheet } from "@react-pdf/renderer";
import type { TProgressReportingShape } from "@app/types";
import { formatDate } from "@app/utils";
import dayjs from "dayjs";

interface TimeframeOfInformationReviewProps {
  data: TProgressReportingShape;
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#666",
  },
  cardContent: {
    fontSize: 11,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  column: {
    flex: 1,
  },
});

export default function TimeframeOfInformationReviewPDF({
  data,
}: TimeframeOfInformationReviewProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>1. Timeframe of information</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Type of timeframe of information</Text>
        <Text style={styles.cardContent}>
          {data?.timeframeOfInformation || "-"}
        </Text>
      </View>

      {data?.startDate && (
        <View style={styles.row}>
          <View style={[styles.column, styles.card]}>
            <Text style={styles.cardTitle}>Start date</Text>
            <Text style={styles.cardContent}>{formatDate(data.startDate)}</Text>
          </View>
          <View style={[styles.column, styles.card]}>
            <Text style={styles.cardTitle}>End date</Text>
            <Text style={styles.cardContent}>
              {dayjs(data.startDate)
                .add(1, "year")
                .subtract(1, "day")
                .format("DD-MM-YYYY")}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
