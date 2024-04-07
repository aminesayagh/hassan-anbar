import { useEffect, useState } from "react";
import { GetPageContentSchema } from "@/helpers/zod";
import { useGetPageContentQuery } from "@/types/generated/graphql";

import { z } from "zod";

type PageContentType = z.infer<typeof GetPageContentSchema>;

function useValidGetContentQuery() {
  const { data: _data, error, loading } = useGetPageContentQuery();
  const [data, setValidatedData] = useState<PageContentType | null>(null);
  const [validationError, setValidationError] =
    useState<z.ZodError<any> | null>(null);

  useEffect(() => {
    if (_data && !error) {
      try {
        // Parse the data using the Zod schema
        const result = GetPageContentSchema.parse(_data);
        setValidatedData(result);
        setValidationError(null);
      } catch (e) {
        if (e instanceof z.ZodError) {
          setValidationError(e);
        }
      }
    }
  }, [_data, error]);

  return { data, error: error || validationError, loading };
}

export function ValidGetContentQuery ({
    children
}: {
    children: (data: PageContentType) => React.ReactNode;
}) {
    const { data, error, loading } = useValidGetContentQuery();
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        console.error(error);
        return <div>Error</div>;
    }
    if (!data) {
        return <div>No data found</div>;
    }
    
    return <>{children(data)}</>;
}

export default useValidGetContentQuery;