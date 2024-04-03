import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import GradiantBGIcon from './GradiantBGIcon';
import ProfilePic from './ProfilePic';
interface HeaderBarProps {
  title?: string;
}
const HeaderBar: React.FC<HeaderBarProps> = ({title}) => {
  return (
    <View style={styles.HeaderBarContainer}>
      <GradiantBGIcon
        name="menu"
        color={COLORS.primaryGreyHex}
        size={FONTSIZE.size_16}
      />
      <Text style={styles.HeaderTitle}>{title}</Text>
      <ProfilePic />
    </View>
  );
};
const styles = StyleSheet.create({
  HeaderBarContainer: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
});

export default HeaderBar;
