import {
  BooleanField,
  ColorField,
  GroupSection,
  IconField,
  SelectField,
  SlugField,
  StringListField,
  TextAreaField,
  TextField,
} from "./BasicFields";
import { ImageField } from "./ImageField";
import { RepeaterField } from "./RepeaterField";
import { isWideField } from "./shared";

export function FieldRenderer(props) {
  const { field, value, onChange, path, errors, context } = props;

  switch (field.type) {
    case "textarea":
      return <TextAreaField {...props} />;
    case "select":
      return <SelectField {...props} />;
    case "slug":
      return <SlugField {...props} />;
    case "icon":
      return <IconField {...props} />;
    case "color":
      return <ColorField {...props} />;
    case "boolean":
      return <BooleanField {...props} />;
    case "string-list":
      return <StringListField {...props} />;
    case "image":
      return <ImageField {...props} field={{ ...field, accept: "image" }} />;
    case "file":
      return <ImageField {...props} field={{ ...field, accept: "file" }} />;
    case "repeater":
      return (
        <RepeaterField
          {...props}
          renderField={(nestedProps) => <FieldRenderer {...nestedProps} />}
        />
      );
    case "group": {
      const groupValue = value && typeof value === "object" ? value : {};

      return (
        <GroupSection title={field.label}>
          {field.fields.map((nestedField) => (
            <div
              key={nestedField.key}
              className={isWideField(nestedField) ? "md:col-span-2" : ""}
            >
              <FieldRenderer
                field={nestedField}
                value={groupValue[nestedField.key]}
                onChange={(nextValue) =>
                  onChange({ ...groupValue, [nestedField.key]: nextValue })
                }
                path={[...path, nestedField.key]}
                errors={errors}
                context={context}
              />
            </div>
          ))}
        </GroupSection>
      );
    }
    default:
      return <TextField {...props} />;
  }
}
