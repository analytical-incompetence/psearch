import {Image} from "@nextui-org/react";

export function Secure({width = 20, height = 20}) {
    return (
        <Image
            src="secure.svg"
            alt="Secure"
            width={width}
            height={height}
            radius={"none"}
            style={{
                maxWidth: `${width}px`,
            }}
        />
    )
}

export function Unsecure({width = 20, height = 20}) {
    return (
        <Image
            src="unsecure.svg"
            alt="Unsecure"
            width={width}
            height={height}
            radius={"none"}
            style={{
                maxWidth: `${width}px`,
            }}
        />
    )
}

export function IsSecure({secure = true, width = 20, height = 20}) {
    return secure ? <Secure width={width} height={height}/> : <Unsecure width={width + 7.5} height={height}/>
}