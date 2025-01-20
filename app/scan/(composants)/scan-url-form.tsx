"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

type FormValues = {
  url: string
}

const ScanUrlForm = () => {
  const router = useRouter()
  const form = useForm<FormValues>({
    defaultValues: {
      url: "",
    },
  })

  const onSubmit = (data: FormValues) => {
    const encodedUrl = encodeURIComponent(data.url)
    router.push(`/scan/${encodedUrl}`)
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Entrez l'URL à scanner..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-green-800">
              Scanner
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ScanUrlForm
