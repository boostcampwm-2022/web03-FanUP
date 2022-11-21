import { render, screen } from '@testing-library/react';
import ImageChip from '@atoms/ImageChip';

describe('<ImageChip/>', () => {
    const props = {
        src: '/test.png',
        width: '50px',
        height: '50px',
    };

    it('rendering test', () => {
        render(<ImageChip src={props.src} width={props.width} height={props.height} />);
        expect(screen.getByAltText('thumbnail')).toBeInTheDocument();
        const imageChip = screen.getByTestId('imageChip');
        expect(imageChip).toHaveAttribute('width', props.width);
        expect(imageChip).toHaveAttribute('height', props.height);
    });
});
