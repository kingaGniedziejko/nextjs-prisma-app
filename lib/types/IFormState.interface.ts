export type IFormState<T> = {
	errors?: Partial<{
		[Property in keyof T]: string;
	}>;
	redirect?: boolean;
};
