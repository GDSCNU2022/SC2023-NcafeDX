import * as yup from 'yup';
import type { InferType } from 'yup';

export const regFormSchema = yup.object({
    menuname: yup.string().required("必須項目です"),
    category: yup.string().required("必須項目です"),
    kcal: yup.number(),
    P: yup.number(),
    F: yup.number(),
    C: yup.number(),
});

export type RegFormSchema = InferType<typeof regFormSchema>;

