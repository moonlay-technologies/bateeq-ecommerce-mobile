import { COLORS, FONTS, SIZES } from './theme';

export const GlobalStyleSheet = {
  container: {
    padding: 15,
  },
  formControl: {
    backgroundColor: COLORS.input,
    height: 50,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.title,
    paddingHorizontal: 12,
  },
  activeInput: {
    borderWidth: 1,
    borderColor: COLORS.title,
  },
  label: {
    ...FONTS.font,
    color: COLORS.label,
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  col50: {
    width: '50%',
    paddingHorizontal: 5,
  },
  col33: {
    width: '33.33%',
    paddingHorizontal: 5,
  },
  card: {
    padding: 15,
    borderRadius: SIZES.radius,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    backgroundColor: COLORS.white,
  },
  errorMessage: {
    color: 'red',
    padding: 5,
  },
};
