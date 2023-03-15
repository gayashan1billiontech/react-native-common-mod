import React from 'react';
import { Text } from 'react-native';
import { separator } from '../utils';

export const Highlighter = (props) => {
  const { defaultStyles, pattern, text, highlighterStyles, ...rest } = props;
  const chunks = separator(text, pattern);
  return (
    <Text style={defaultStyles} {...rest}>
      {chunks.map((c, i) =>
        c?.toString()?.toLowerCase() === pattern?.toString()?.toLowerCase() ? (
          <Text key={i} style={highlighterStyles}>
            {c}
          </Text>
        ) : (
          <Text key={i}>{c}</Text>
        )
      )}
    </Text>
  );
};
