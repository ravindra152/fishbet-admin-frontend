import useForm from '../../../components/Common/Hooks/useFormModal';
import { filterValues, staticFiltersFields } from '../formDetails';

const useFilters = () => {
	const { validation, formFields} = useForm({
		initialValues: filterValues(),
		staticFormFields: staticFiltersFields(),
		
	});

  return {
	filterValidation: validation,
	filterFields: formFields,
  }
}

export default useFilters
