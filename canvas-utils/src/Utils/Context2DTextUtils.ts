import { TextBounds } from "../Types/TextBounds";

export default class Context2DTextUtils {
    #context: CanvasRenderingContext2D | any = null;

    constructor(context: CanvasRenderingContext2D | any) {
        this.#context = context;
    };

    wordBreak: "break-all" | "break-words" = "break-words";

    getFontSize(): number {
        const textMetrics: TextMetrics = this.#context.measureText("A");

        return textMetrics.actualBoundingBoxDescent - textMetrics.actualBoundingBoxAscent;
    };

    #getPreviousIndexOf(haystack: string, needle: string, startIndex: number): number {
        for(let needleIndex = startIndex; needleIndex != -1; needleIndex--) {
            if(haystack[needleIndex] !== needle)
                continue;
            
            startIndex = needleIndex + 1;

            break;
        }

        return startIndex;
    };

    // to support Canvas.CanvasRenderingContext2D, we'll accept any type, but we'll leave CanvasRenderingContext2D
    // for intelli sense
    fillTextBounds(text: string, x: number, y: number, width: number, height: number): TextBounds {
        const lines: string[] = [];

        for(let index: number = 0; index < text.length; index++) {

            // if it's a new line before we've reached the bound width, then we'll break into a new line
            if(text[index] === '\n') {
                lines.push(text.substring(0, index));

                text = text.substring(index + 1);
                
                index = 0;

                continue;
            }

            // it's important that we measure the whole line each time because of different font ligerature behaviours
            const measurements: TextMetrics = this.#context.measureText(text.substring(0, index));

            // if it's OVER the width, then we cut the line at the previous line
            // we don't check if it's exactly the width, that's a job for the next index to deal with
            // like we're doing here
            if(measurements.width > width) {

                // what if there's some obscure character that takes up the full width already, or if the bound width
                // is too small? then let's cut it out as an overflow
                if(index === 0) {
                    text = text.substring(index);
                    
                    index = 0;

                    continue;
                }

                if(this.wordBreak === "break-words" && text[index] !== ' ') {
                    const needleIndex = this.#getPreviousIndexOf(text, ' ', index);

                    if(needleIndex !== index) {
                        index = needleIndex;
                        
                        lines.push(text.substring(0, index - 1));
        
                        text = text.substring(index);
                        
                        index = 0;

                        continue;
                    }
                }

                // break it into a new line

                lines.push(text.substring(0, index - 1));

                text = text.substring(index - 1);
                
                index = 0;

                continue;
            }
        }

        if(text.length !== 0)
            lines.push(text);

        const fontSize: number = this.getFontSize();

        let maximumWidth: number = 0;

        lines.forEach((line: string, index: number) => {
            const textMetrics: TextMetrics = this.#context.measureText(line);

            if(textMetrics.width > maximumWidth)
                maximumWidth = textMetrics.width;

            this.#context.fillText(line, x, y + (index * fontSize));
        });

        return {
            actualWidth: maximumWidth,
            actualHeight: (lines.length * fontSize)
        };
    };
};
