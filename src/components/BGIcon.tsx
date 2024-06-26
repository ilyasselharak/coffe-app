import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BORDERRADIUS, SPACING} from '../theme/theme';
import CustomIcon from './CustomIcon';

interface BGIconProps {
  name: string;
  color: string;
  size: number;
  BGColor: string;
}

const BGIcon: React.FC<BGIconProps> = ({name, BGColor, color, size}) => {
  return (
    <View style={[styles.IconBG, {backgroundColor: BGColor}]}>
      <CustomIcon name={name} color={color} size={size} />
    </View>
  );
};

export default BGIcon;

const styles = StyleSheet.create({
  IconBG: {
    height: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_8,
    width: SPACING.space_30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
