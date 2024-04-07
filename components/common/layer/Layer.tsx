import dynamic from 'next/dynamic';
const HeaderDynamic = dynamic(() => import('@/components/common/header'), {});

const Layer = ({ children }: {
    children: React.ReactElement | React.ReactElement[];
}) => {


    return <>
        <HeaderDynamic />
        {children}
    </>
}

export default Layer;