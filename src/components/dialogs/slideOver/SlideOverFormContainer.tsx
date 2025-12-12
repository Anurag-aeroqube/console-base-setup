import { Button } from "@/components/ui/button";
import { SlideOver } from "./SlideOver";
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { LOCALIZATION_KEYS } from "@/i18n/keys";
import { useTranslation } from "react-i18next";

export type FieldType =
  | "text"
  | "number"
  | "select"
  | "multi-select"
  | "chip-select"
  | "textarea"
  | "date"
  | "switch"
  | "checkbox";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  defaultValue?: any;
  options?: Array<{ label: string; value: string | number }>;
  required?: boolean;
}

export function SlideOverFormContainer({
  open,
  onClose,
  title,
  fields,
  onSubmit,
  width = "450px",
  stickyFooter=true,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  fields: FieldConfig[];
  onSubmit: (data: any) => void;
  width?: string;
   stickyFooter?: boolean;
}) {
  const [formData, setFormData] = useState<Record<string, any>>(() =>
    fields.reduce((acc, f) => {
      acc[f.name] = f.defaultValue ?? (f.type === "multi-select" || f.type === "chip-select" ? [] : "");
      return acc;
    }, {} as Record<string, any>)
  );

 const { t } = useTranslation();
  

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleFormSubmit = () => {
    onSubmit(formData);
  };

  const renderField = (field: FieldConfig) => {
    const value = formData[field.name];

    // -----------------------
    // BASIC INPUTS
    // -----------------------
    if (["text", "number", "date"].includes(field.type)) {
      return (
        <input
          type={field.type}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => handleChange(field.name, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      );
    }

    // -----------------------
    // TEXTAREA
    // -----------------------
    if (field.type === "textarea") {
      return (
        <textarea
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => handleChange(field.name, e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      );
    }

    // -----------------------
    // SEARCHABLE SINGLE SELECT
    // -----------------------
    if (field.type === "select") {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {value
                ? field.options?.find((opt) => opt.value === value)?.label
                : field.placeholder || "Select"}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-full p-0 bg-background">
            <Command>
              <CommandInput placeholder={t(LOCALIZATION_KEYS.COMMON.SEARCH)} />
              <CommandList className="bg-background">
                {field.options?.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    onSelect={() => handleChange(field.name, opt.value)}
                  >
                    {opt.label}
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      );
    }

    // -----------------------
    // MULTI SELECT
    // -----------------------
   // -----------------------
// MULTI SELECT WITH CHIPS INSIDE FIELD + SCROLL
// -----------------------
if (field.type === "multi-select") {
  const selectedValues = value || [];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className="w-full border border-gray-300 rounded-md px-2 py-2 min-h-[42px] 
                     flex flex-wrap gap-2 cursor-pointer overflow-y-auto"
          style={{ maxHeight: "110px" }} 
        >
          {selectedValues.length === 0 && (
            <span className="text-gray-500">{field.placeholder || "Select options"}</span>
          )}

          {selectedValues.map((val: any) => {
            const opt = field.options?.find((o) => o.value === val);
            return (
              <div
                key={val}
                className="px-2 py-1 bg-primary/10 border gap-4  border-primary/30 rounded flex items-center text-sm"
              >
                {opt?.label}
                <button
                  className="text-muted-foreground text-xs"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleChange(
                      field.name,
                      selectedValues.filter((x: any) => x !== val)
                    );
                  }}
                >
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0 bg-background">
        <Command>
          <CommandInput placeholder={t(LOCALIZATION_KEYS.COMMON.SEARCH)}/>
          <CommandList className="bg-background">
            {field.options?.map((opt) => {
              const selected = selectedValues.includes(opt.value);

              return (
                <CommandItem
                  key={opt.value}
                  onSelect={() => {
                    let updated = [];
                    if (selected) {
                      updated = selectedValues.filter((v: any) => v !== opt.value);
                    } else {
                      updated = [...selectedValues, opt.value];
                    }
                    handleChange(field.name, updated);
                  }}
                >
                  <input type="checkbox" checked={selected} readOnly className="mr-2" />
                  {opt.label}
                </CommandItem>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}


    // -----------------------
    // CHIP SELECT (TAGS)
    // -----------------------
    if (field.type === "chip-select") {
      const selectedValues = value || [];

      return (
        <div className="space-y-2">
          {/* Chips */}
          <div className="flex flex-wrap gap-2">
            {selectedValues.map((val: any) => {
              const opt = field.options?.find((o) => o.value === val);
              return (
                <div
                  key={val}
                  className="px-2 py-1 bg-primary/10 border border-primary/30 rounded flex items-center gap-2"
                >
                  {opt?.label}
                  <button
                    className="text-muted-foreground"
                    onClick={() =>
                      handleChange(
                        field.name,
                        selectedValues.filter((x: any) => x !== val)
                      )
                    }
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          {/* Selector */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                  {t(LOCALIZATION_KEYS.FORM_FIELDS.ADD_TAG)}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder={t(LOCALIZATION_KEYS.COMMON.SEARCH)}/>
                <CommandList className="bg-background">
                  {field.options?.map((opt) => (
                    <CommandItem
                      key={opt.value}
                      onSelect={() => {
                        if (!selectedValues.includes(opt.value)) {
                          handleChange(field.name, [...selectedValues, opt.value]);
                        }
                      }}
                    >
                      {opt.label}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      );
    }

    // -----------------------
    // SWITCH
    // -----------------------
    if (field.type === "switch") {
      return (
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleChange(field.name, e.target.checked)}
            className="sr-only"
          />
          <div
            className={`w-12 h-6 rounded-full transition ${
              value ? "bg-primary" : "bg-gray-400"
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white transition-transform ${
                value ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
        </label>
      );
    }

    // -----------------------
    // CHECKBOX
    // -----------------------
    if (field.type === "checkbox") {
      return (
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => handleChange(field.name, e.target.checked)}
        />
      );
    }

    return null;
  };

  return (
    <SlideOver open={open} onClose={onClose} title={title} width={width}>
      <div className="space-y-5">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label className="text-sm font-medium ">
              {field.label}
            </label>
            <span className="pt-4"> {renderField(field)}</span>
           
          </div>
        ))}
        </div>

        {/* Footer */}
       <div
  className={
    stickyFooter
      ? "sticky bottom-0 border-t flex justify-center gap-4 items-center bg-background h-[14vh] "
      : "flex justify-end gap-4 pt-4 border-t mt-6"
  }
>
          <Button variant="outline" size="default" onClick={onClose} className="w-[50%] cursor-pointer">
            {t(LOCALIZATION_KEYS.BUTTONS.CANCEL)}
          </Button>
          <Button className="bg-primary w-[50%] cursor-pointer" onClick={handleFormSubmit} >
            {t(LOCALIZATION_KEYS.BUTTONS.SAVE)}
          </Button>
        </div>
    </SlideOver>
  );
}
