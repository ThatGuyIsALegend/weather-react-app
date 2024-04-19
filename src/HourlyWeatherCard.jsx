import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";

export function HourlyWeatherCard({hour, icon, temperature}) {

    const iconLink = `https://openweathermap.org/img/wn/${icon}@2x.png`

    return (
        <Card className="w-auto">
            <CardBody className="flex flex-col justify-around py-10">
                <span className="text-center text-4xl">
                    {hour}
                </span>
                <img src={iconLink}/>
                <span className="text-center text-3xl">{temperature}°C</span>
            </CardBody>
        </Card>
    )
}