import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

interface NumericFieldProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
  step?: string;
}

export function NumericField<TFieldValues extends FieldValues>({ 
  form, 
  name, 
  label, 
  placeholder, 
  step = "0.01" 
}: NumericFieldProps<TFieldValues>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="number"
              step={step}
              placeholder={placeholder}
              {...field}
              onChange={(e) => {
                const val = e.target.value;
                field.onChange(val === "" ? "" : Number(val));
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
