import React from 'react'
import { ButtonSize, ButtonVariant } from '../styles';
import { ButtonFactory } from '../ButtonFactory';

interface IButtonProps {
    variant: ButtonVariant;
    text: string;
    onClick: () => void;
    size?: ButtonSize;
    disabled?: boolean;
};

const ButtonDesignPatten: React.FC<IButtonProps> = ({
    variant,
    text,
    onClick,
    size = "medium",
    disabled = false,
}) => {
    const { className, disabled: isDisabled } = ButtonFactory.createButtonConfig(variant, size, disabled);

    return (
        <button className={className} onClick={onClick} disabled={isDisabled}>
            {text}
        </button>
    );
};
export default ButtonDesignPatten;