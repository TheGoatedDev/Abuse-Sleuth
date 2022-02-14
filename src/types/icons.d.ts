interface AbuseSleuthFAIconProps
    extends BackwardCompatibleOmit<
        SVGAttributes<SVGSVGElement>,
        "children" | "mask" | "transform"
    > {
    forwardedRef?: ((e: any) => void) | React.MutableRefObject<any> | null;
    mask?: IconProp;
    className?: string;
    color?: string;
    spin?: boolean;
    pulse?: boolean;
    border?: boolean;
    fixedWidth?: boolean;
    inverse?: boolean;
    listItem?: boolean;
    flip?: FlipProp;
    size?: SizeProp;
    pull?: PullProp;
    rotation?: RotateProp;
    transform?: string | Transform;
    symbol?: FaSymbol;
    style?: CSSProperties;
    tabIndex?: number;
    title?: string;
    swapOpacity?: boolean;
}
