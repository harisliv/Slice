import { Text, View, StyleSheet } from '@react-pdf/renderer';
import type { TProgressReportingShape } from '@app/types';

interface ChallengesAndOpportunitiesReviewProps {
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
  listItem: {
    fontSize: 11,
    marginLeft: 10,
    marginBottom: 3
  }
});

export default function ChallengesAndOpportunitiesReviewPDF({
  data
}: ChallengesAndOpportunitiesReviewProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>4. Challenges and opportunities</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Types of challenges</Text>
        {data?.typesOfChallengesFaced?.length > 0 ? (
          data.typesOfChallengesFaced.map((challenge, i) => (
            <Text key={i} style={styles.listItem}>
              • {challenge || '-'}
            </Text>
          ))
        ) : (
          <Text style={styles.cardContent}>-</Text>
        )}
      </View>

      {data?.othersTypesOfChallengesFaced && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Other types of challenges</Text>
          <Text style={styles.cardContent}>
            {data.othersTypesOfChallengesFaced}
          </Text>
        </View>
      )}

      {data?.descriptionOfChallenges && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Description of challenges</Text>
          <Text style={styles.cardContent}>{data.descriptionOfChallenges}</Text>
        </View>
      )}

      {data?.descriptionOfOpportunitiesIdentified && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Description of opportunities</Text>
          <Text style={styles.cardContent}>
            {data.descriptionOfOpportunitiesIdentified}
          </Text>
        </View>
      )}
    </View>
  );
}
