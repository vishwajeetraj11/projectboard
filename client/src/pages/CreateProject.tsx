import { useAuth0 } from '@auth0/auth0-react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { LogoutButton } from 'components/auth/Logout';
import { Formik } from 'formik';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { baseURL, endpoints } from 'shared/urls';
import * as Yup from 'yup';

interface Props extends RouteComponentProps<{}> {

}
// Validation Schema for PersonalData form
const ValidationSchema = Yup.object().shape({
  title: Yup.string().required('Project title is required.'),
  description: Yup.string().required('Project Description is required.'),
});

export const CreateProject: React.FC<Props> = () => {
  const { getAccessTokenSilently } = useAuth0();

  return (
    <section className='p-4 lg:p-0 w-full min-h-screen max-w-screen-lg mx-auto bg-white'>
      <div className='p-y lg:py-10 sm:px-4 lg:px-0 flex items-center justify-between'>
        <h2>Product Board</h2>
        <LogoutButton />
      </div>
      <div>
        <Formik
          initialValues={{
            title: '',
            description: '',
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validateOnMount={false}
          validationSchema={ValidationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(async () => {
              try {
                const token = await getAccessTokenSilently();
                await axios({
                  url: `${baseURL}${endpoints.projects}`,
                  method: 'POST',
                  data: values,
                  headers: {
                    Authorization: `Bearer ${token}`,
                  }
                });

              } catch (error) {
                console.log(error);
              }

              setSubmitting(false);
            }, 400);
          }}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
            <form className="pb-10" onSubmit={handleSubmit}>
              <div className="">
                <div className="flex align-center justify-between">
                  <h3 className="text-lg font-medium mt-6">Create Project</h3>
                </div>
                <TextField
                  id="title"
                  className="mt-6"
                  rows={1}
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    style: {
                      boxShadow: 'none'
                    }
                  }}
                  multiline
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Enter Title"
                  value={values.title}
                  error={!!errors.title}
                  helperText={errors.title}
                />
                <TextField
                  id="description"
                  className="mt-10"
                  rows={1}
                  multiline
                  variant="outlined"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Enter Description"
                  inputProps={{
                    style: {
                      boxShadow: 'none'
                    }
                  }}
                  value={values.description}
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </div>
              {/* <Divider className="mt-8 -ml-10" /> */}
              <Button className="mt-6" variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                <p className='tracking-widest'>Submit</p>
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
};
