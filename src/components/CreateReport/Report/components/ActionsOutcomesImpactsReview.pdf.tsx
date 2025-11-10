import { Text, View, Link, StyleSheet } from '@react-pdf/renderer';
import type { TProgressReportingShape } from '@app/types';

interface ActionsOutcomesImpactsReviewProps {
  data: TProgressReportingShape;
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 15
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 8
  },
  card: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 4
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666'
  },
  cardContent: {
    fontSize: 11,
    color: '#333'
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10
  },
  column: {
    flex: 1
  },
  listItem: {
    fontSize: 11,
    marginLeft: 10,
    marginBottom: 3
  },
  link: {
    fontSize: 10,
    color: '#0066cc',
    textDecoration: 'underline',
    marginLeft: 10,
    marginBottom: 3
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginVertical: 15
  }
});

export default function ActionsOutcomesImpactsReviewPDF({
  data
}: ActionsOutcomesImpactsReviewProps) {
  const actions = data?.actions?.length ? data.actions : null;

  return (
    <View style={styles.section}>
      <Text style={styles.title}>2. Actions, outcomes, impacts</Text>

      {actions ? (
        actions.map((action, index) => (
          <View key={action.id}>
            <Text style={styles.actionTitle}>Action {index + 1}</Text>

            <View style={styles.row}>
              <View style={[styles.column, styles.card]}>
                <Text style={styles.cardTitle}>Title</Text>
                <Text style={styles.cardContent}>{action.title || '-'}</Text>
              </View>
              <View style={[styles.column, styles.card]}>
                <Text style={styles.cardTitle}>Type of action</Text>
                <Text style={styles.cardContent}>
                  {action.typeOfAction || '-'}
                </Text>
              </View>
            </View>

            {action.typeOther && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>
                  Type of action undertaken - other
                </Text>
                <Text style={styles.cardContent}>{action.typeOther}</Text>
              </View>
            )}

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Description</Text>
              <Text style={styles.cardContent}>
                {action.description || '-'}
              </Text>
            </View>

            {action?.associatedTargets &&
              action.associatedTargets.length > 0 && (
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Associated targets</Text>
                  {action.associatedTargets.map((target, i) => (
                    <Text key={i} style={styles.listItem}>
                      • {target}
                    </Text>
                  ))}
                </View>
              )}

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Outcomes</Text>
              <Text style={styles.cardContent}>{action.outcomes || '-'}</Text>
            </View>

            {action.outcomesUrl?.length > 0 && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Outcomes URL</Text>
                {action.outcomesUrl.map((url, i) =>
                  url ? (
                    <View key={i}>
                      <Link src={url} style={styles.link}>
                        • {url}
                      </Link>
                    </View>
                  ) : null
                )}
              </View>
            )}

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Impact explanation</Text>
              <Text style={styles.cardContent}>
                {action.impactExplanation || '-'}
              </Text>
            </View>

            {action.contributionToMultilateralProcess?.length > 0 && (
              <>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>
                    Contribution to multilateral process
                  </Text>
                  {action.contributionToMultilateralProcess.map(
                    (contribution, i) => (
                      <Text key={i} style={styles.listItem}>
                        • {contribution}
                      </Text>
                    )
                  )}
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Contribution description</Text>
                  <Text style={styles.cardContent}>
                    {action.contributionOfTheAction || '-'}
                  </Text>
                </View>
              </>
            )}

            {index !== actions.length - 1 && <View style={styles.divider} />}
          </View>
        ))
      ) : (
        <Text style={styles.cardContent}>-</Text>
      )}
    </View>
  );
}
