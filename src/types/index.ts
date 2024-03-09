import { InferType } from 'yup';

import validationSchema from '../schemas';

export type TNameForm = InferType<typeof validationSchema>;
