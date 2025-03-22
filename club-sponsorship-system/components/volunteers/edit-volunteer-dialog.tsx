"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { updateVolunteer } from "@/lib/data-utils"
import type { Volunteer } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"

interface EditVolunteerDialogProps {
  volunteer: Volunteer
  open: boolean
  onOpenChange: (open: boolean) => void
  onVolunteerUpdated: () => void
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  sponsorsAcquired: z.coerce.number().min(0, "Sponsors acquired must be 0 or greater"),
  totalAmountAcquired: z.coerce.number().min(0, "Total amount must be 0 or greater"),
})

type FormValues = z.infer<typeof formSchema>

export function EditVolunteerDialog({ volunteer, open, onOpenChange, onVolunteerUpdated }: EditVolunteerDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: volunteer.name,
      email: volunteer.email,
      phone: volunteer.phone,
      sponsorsAcquired: volunteer.sponsorsAcquired,
      totalAmountAcquired: volunteer.totalAmountAcquired,
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true)

    try {
      // Update the volunteer in localStorage
      updateVolunteer({
        ...volunteer,
        ...values,
      })

      // Show success toast
      toast({
        title: "Volunteer updated",
        description: "The volunteer has been updated successfully.",
      })

      // Close dialog and refresh list
      onOpenChange(false)
      onVolunteerUpdated()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update volunteer. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Volunteer</DialogTitle>
          <DialogDescription>Update the details of the volunteer below.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sponsorsAcquired"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sponsors Acquired</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalAmountAcquired"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Amount ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

