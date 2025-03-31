    'use client';

    import { ButtonFactory, WebButtonFactory, MobileButtonFactory, TabletButtonFactory } from './components/button-factory';
    import { useMediaQuery } from '@/hooks/use-media-query';
    import { ButtonProps } from './components/button-interface';

    export default function ButtonClient({ label,onClick, className }: ButtonProps) {
    const isMobile = useMediaQuery('(max-width: 640px)');
    const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
    
    let buttonFactory: ButtonFactory;
    
    if (isMobile) {
        buttonFactory = new MobileButtonFactory();
    } else if (isTablet) {
        buttonFactory = new TabletButtonFactory();
    } else {
        buttonFactory = new WebButtonFactory();
    }
    
    // Pass the props directly to the button
    return buttonFactory.renderButton({
        label,
        className,
        onClick
    });
    }