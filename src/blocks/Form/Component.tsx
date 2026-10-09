'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro?: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
  sectionId?: string | null
}

export const FormBuilderRenderer: React.FC<{
  form: FormType
}> = ({ form: formFromProps }) => {
  const { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } =
    formFromProps || {}

  const formMethods = useForm({
    defaultValues: formFromProps?.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 500ms
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 500)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect
            if (url) router.push(url)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong. Please try again.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <FormProvider {...formMethods}>
      {!isLoading && hasSubmitted && confirmationType === 'message' && (
        <div className="rounded-lg border border-(--pastel-green-border) bg-(--pastel-green) p-6 text-(--pastel-green-text) text-sm">
          <RichText data={confirmationMessage} />
        </div>
      )}
      {isLoading && !hasSubmitted && (
        <div className="py-8 text-center text-muted-foreground animate-pulse text-sm font-mono">
          Sending your submission...
        </div>
      )}
      {error && (
        <div className="mb-6 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          {error.message || 'An error occurred'}
        </div>
      )}
      {!hasSubmitted && (
        <form id={formID} onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            {formFromProps &&
              formFromProps.fields &&
              formFromProps.fields?.map((field, index) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                if (Field) {
                  return (
                    <div key={index}>
                      <Field
                        form={formFromProps}
                        {...field}
                        {...formMethods}
                        control={control}
                        errors={errors}
                        register={register}
                      />
                    </div>
                  )
                }
                return null
              })}
          </div>

          <div className="mt-7">
            <Button
              className="w-full sm:w-auto min-w-36"
              disabled={isLoading}
              form={formID}
              size="lg"
              type="submit"
            >
              {isLoading ? 'Submitting...' : submitButtonLabel || 'Submit'}
            </Button>
          </div>
        </form>
      )}
    </FormProvider>
  )
}

export const FormBlock: React.FC<
  {
    id?: string
    sectionId?: string | null
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    id,
    introContent,
    sectionId,
  } = props

  return (
    <section
      id={sectionId || id || 'form'}
      className="container max-w-5xl py-8 md:py-12 scroll-mt-20"
    >
      <div className="mx-auto max-w-2xl">
        {enableIntro && introContent && (
          <div className="mb-8 md:mb-10">
            <RichText
              className="prose-h2:font-serif prose-h2:text-3xl prose-h2:font-normal prose-h2:tracking-tight prose-p:text-muted-foreground"
              data={introContent}
              enableGutter={false}
            />
          </div>
        )}
        <div className="overflow-hidden rounded-xl border border-border bg-card p-6 sm:p-8 md:p-10 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          {formFromProps && <FormBuilderRenderer form={formFromProps} />}
        </div>
      </div>
    </section>
  )
}
