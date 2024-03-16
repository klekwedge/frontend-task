import * as yup from 'yup';

const validationSchema = yup.object().shape({
    name: yup
        .string()
        .matches(/^[a-zA-Z]+$/, 'Имя должно состоять только из латинских букв')
        .required('Введите имя'),
});

export default validationSchema;