import { useAuth0 } from '@auth0/auth0-react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { baseURL, endpoints } from 'shared/urls';
import * as Yup from 'yup';

interface Props {
  project: {
    title: string,
    description: string;
    _id: string;
  },
  redirect: string;
  title: string;
  type: 'edit' | 'create';
}

// Validation Schema for Project form
const ValidationSchema = Yup.object().shape({
  title: Yup.string().required('Project Title is required.'),
  description: Yup.string().required('Project Description is required.'),
});

export const ProjectForm: React.FC<Props> = ({ project, redirect, title, type }) => {
  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();
  const projectData = {
    title: project?.title || '',
    description: project?.description || '',
  };
  return (
    <Formik
      initialValues={projectData}
      validateOnChange={false}
      validateOnBlur={false}
      validateOnMount={false}
      validationSchema={ValidationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(async () => {
          try {
            const token = await getAccessTokenSilently();
            await axios({
              url: `${type === 'create' ? `${baseURL}${endpoints.projects}` : `${baseURL}${endpoints.projects}/${project._id}`}`,
              method: `${type === 'create' ? 'POST' : 'PATCH'}`,
              data: values,
              headers: {
                Authorization: `Bearer ${token}`,
              }
            });

            if (redirect) {
              history.push(redirect);
            }

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
              <h3 className="text-lg font-medium mt-6">{title}</h3>
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
  );
};
