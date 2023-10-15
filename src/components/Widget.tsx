type WidgetProps = {
    children: string;
    className?: string;
    color?: string;
}

export default function Widget({children, className, color}: WidgetProps) {
    return (
        <div className={`${className} ${color}`}>
            <p>
                { children }
            </p>
        </div>
    )
}