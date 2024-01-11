(function (){
    const $ = document.querySelector.bind(document);
    const fileInput = $('#fileInput');
    const status = $('.status');
    const statusText = $('#statusText');
    const downloadBtn = $('#downloadBtn');
    const result = $('#result');
    const filenameInput = $('#filename');

    filenameInput.addEventListener('input', event => {
        downloadBtn.download = event.target.value;
    })

    fileInput.addEventListener('input', async event => {
        const file = event.target.files[0];
        if (file) {
            result.display = 'none';
            statusText.innerText = '转换中';
            const srt = await lrcToSrt(file);
            const srtFile = new File([srt], 'lrc.srt');
            const url = await file2url(srtFile);
            downloadBtn.href = url;
            downloadBtn.style.display = 'inline';
            statusText.innerText = '转换完成';
        }
    })


    async function lrcToSrt(file) {
        const lrcRowReg = /^\[(\d{2}):(\d{2})\.(\d{2})\](.*)$/;
        const data = await readFile(file);
        const rows = data.split(/\r|\n/g).filter(row => lrcRowReg.test(row));

        const result = [];
        let index = 1;
        rows.reduce((prev, curr) => {
            const plrc = parseLyricRow(prev);
            const lrc = parseLyricRow(curr);

            result.push({
                no: index++,
                start: `00:${plrc.min}:${plrc.sec},${plrc.ms}0`,
                end: `00:${lrc.min}:${lrc.sec},${lrc.ms}0`,
                text: plrc.text
            })

            return curr;
        });

        const srt = result.map(item => {
            const val = 
`${item.no}
${item.start} --> ${item.end}
${item.text}

`;
            return val;
        }).join('');
        
        return srt;


        function parseLyricRow(lyricRow) {
            const result = lrcRowReg.exec(lyricRow);
            if (!result) return undefined;
            const [_, min, sec, ms, text] = result;
            return { min, sec, ms, text };
        }
    }

    /**
     * 
     * @param {File} file 
     * @param {string} encoding 
     * @returns {Promise<string>}
     */
    function readFile(file, encoding = 'utf-8') {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = event => resolve(event.target.result);
            reader.onerror = reject;
            reader.readAsText(file, encoding);
        })
    }

    /**
     * 
     * @param {File} file 
     * @param {string} encoding 
     * @returns {Promise<string>}
     */
    function file2url(file, encoding = 'utf-8') {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = event => resolve(event.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file, encoding);
        })
    }
})()