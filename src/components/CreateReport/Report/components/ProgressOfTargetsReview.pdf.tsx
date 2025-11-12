import { Text, View, StyleSheet } from "@react-pdf/renderer";
import type { TProgressReportingShape } from "@app/types";
import { renderValueOrHyphen } from "@app/utils";

interface ProgressOfTargetsReviewProps {
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
  targetTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 8,
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
    marginBottom: 10,
  },
  column: {
    flex: 1,
  },
  table: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    padding: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    padding: 5,
  },
  tableCell: {
    flex: 1,
    fontSize: 9,
    padding: 3,
  },
  tableCellHeader: {
    flex: 1,
    fontSize: 9,
    fontWeight: "bold",
    padding: 3,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginVertical: 15,
  },
});

export default function ProgressOfTargetsReviewPDF({
  data,
}: ProgressOfTargetsReviewProps) {
  const targets = data?.targets?.length ? data.targets : null;

  return (
    <View style={styles.section}>
      <Text style={styles.title}>3. Progress of targets</Text>

      {targets ? (
        targets.map((target, index) => (
          <View key={target.id}>
            <Text style={styles.targetTitle}>Target {index + 1}</Text>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Target description</Text>
              <Text style={styles.cardContent}>
                {target.description || "-"}
              </Text>
            </View>

            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableCellHeader}>Target year</Text>
                <Text style={styles.tableCellHeader}>Base year</Text>
                <Text style={styles.tableCellHeader}>Type</Text>
                <Text style={styles.tableCellHeader}>Unit</Text>
                <Text style={styles.tableCellHeader}>Value</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>
                  {renderValueOrHyphen(target.year)}
                </Text>
                <Text style={styles.tableCell}>
                  {renderValueOrHyphen(target.baseYear)}
                </Text>
                <Text style={styles.tableCell}>
                  {target.types?.join(", ") || "-"}
                </Text>
                <Text style={styles.tableCell}>
                  {renderValueOrHyphen(target.unit)}
                </Text>
                <Text style={styles.tableCell}>
                  {renderValueOrHyphen(target.value)}
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.column, styles.card]}>
                <Text style={styles.cardTitle}>Reported value</Text>
                <Text style={styles.cardContent}>
                  {!isNaN(target.reportValue)
                    ? target.reportValue.toString()
                    : "-"}
                </Text>
              </View>
              <View style={[styles.column, styles.card]}>
                <Text style={styles.cardTitle}>Description of status</Text>
                <Text style={styles.cardContent}>
                  {target.descriptionStatus || "-"}
                </Text>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Updated status</Text>
              <Text style={styles.cardContent}>
                {target.updateStatus || "-"}
              </Text>
            </View>

            {index !== targets.length - 1 && <View style={styles.divider} />}
          </View>
        ))
      ) : (
        <Text style={styles.cardContent}>-</Text>
      )}
    </View>
  );
}
