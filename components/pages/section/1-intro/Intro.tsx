import useValidGetContentQuery from "@/hook/useValidGetContentQuery";
import Text from "@/components/ui/typography/Text";
import { textStyle } from "@/components/ui/typography/Typography.style";



const Intro = () => {
    const { data, error, loading } = useValidGetContentQuery();
    if (loading) {
        return null;
    }
    if (error) {
        console.error(error);
        return <div>Error</div>;
    }
    if (!data) {
        return <div>No data found</div>;
    }

    const { page: { blocks } } = data;
    return (
        <div className='grid grid-cols-12 gap-4 pt-20'>
            <div className=''>
                <Text className={textStyle({
                    weight: 'bold',
                    size: 'xl',
                    degree: '2'
                })} p>
                    ds
                </Text>
            </div>
        </div>
    )
}

export default Intro;