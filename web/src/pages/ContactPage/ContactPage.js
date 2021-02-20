import BlogLayout from 'src/layouts/BlogLayout'
import {
  Form,
  FormError,
  Label,
  TextField,
  Submit,
  TextAreaField,
  FieldError,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { useForm } from 'react-hook-form'

const CREATE_CONTACT = gql`
  mutation createContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm()

  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      formMethods.reset()
      alert('thanks')
    },
  })

  const onSubmit = async (data) => {
    create({ variables: { input: data } })
    console.log('data :>> ', data)
  }
  return (
    <BlogLayout>
      <Form
        onSubmit={onSubmit}
        validation={{ mode: 'onBlur' }}
        formMethods={formMethods}
        error={error}
      >
        <FormError error={error} />
        <Label name="name" errorClassName="text-red-500" />
        <TextField
          name="name"
          className="input"
          validation={{ required: true }}
          errorClassName="border border-red-500"
        />
        <FieldError name="name" className="text-red-500" />

        <Label name="email" errorClassName="text-red-500" />
        <TextField
          name="email"
          errorClassName="border border-red-500"
          validation={{
            required: true,
            pattern: {
              value: /[^@]+@[^\.]+\..+/,
            },
          }}
        />
        <FieldError name="email" className="text-red-500" />

        <Label name="message" errorClassName="text-red-500" />
        <TextAreaField
          errorClassName="border border-red-500"
          name="message"
          validation={{
            required: true,
          }}
        />
        <FieldError name="message" className="block text-red-500" />

        <Submit disabled={loading}>Save</Submit>
      </Form>
    </BlogLayout>
  )
}

export default ContactPage
