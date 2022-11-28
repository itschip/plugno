export const classes = (...classes: string[]) => {
	return classes.filter(Boolean).join(' ');
};
