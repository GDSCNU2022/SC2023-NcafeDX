import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

type Props = {
    data: {
    P: number,
    F: number,
    C: number,
    }
}
const PFCRadarChart = (props: Props) => {
    const data = [
        {
            subject: 'P',
            nutrition: props.data.P,
            fullMark: 200
        },
        {
            subject: 'F',
            nutrition: props.data.F,
            fullMark: 200
        },
        {
            subject: 'C',
            nutrition: props.data.C,
            fullMark: 200
        }
    ];

    return (
        <RadarChart
            cx={110}
            cy={105}
            outerRadius={80}
            width={200}
            height={150}
            data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject"/>
        <Radar
            name="PFC balance"
            dataKey="nutrition"
            stroke="#FF4500"
            fill="#FF8C00"
            fillOpacity={0.6}/>
        </RadarChart>
    )
};

export default PFCRadarChart