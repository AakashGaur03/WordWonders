$(document).ready(function () {




    const wordoftheday = {
        async: true,
        crossDomain: true,
        url: 'https://word-of-the-day2.p.rapidapi.com/word/today',
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bba68abeeemshd51b015ba611b45p19dcfajsn090bb51f76ce',
            'X-RapidAPI-Host': 'word-of-the-day2.p.rapidapi.com'
        }
    };

    $.ajax(wordoftheday).done(function (response) {

        if (response[1].date) {
            $('.WOTDdate').text(response[1].date);
        }

        if (response[1].word) {
            $('.WOTDword').text(response[1].word)
        }

        if (response[1].mean) {
            $('.WOTDmean').html(`means  <br>${response[1].mean}`);
        }


    });


    function DictApi() {
        $('.DictWord').text("")
        $('.DictPhonetic').text("")
        $('.DictPartOfSpeech').text("")
        $('.DictDefinition').text("")
        $('.Dictsynonyms').text("")
        $('.audio').html('')
        $('.fa-solid').addClass('visually-hidden')


        var inputValue = $('#inputValue').val();
        if (inputValue == "") {
            inputValue = "Hello"
        }

        dictionaryurl = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`

        $.get(dictionaryurl, function (data) {


            if (data[0].word) {
                $('.DictWord').text(data[0].word)
            }

            if (data[0].phonetic) {
                $('.DictPhonetic').text(data[0].phonetic)
            }


            if (data[0].phonetics[0].audio) {
                $('.fa-solid').removeClass('visually-hidden')

                $('.btn2').click(function (e) {
                    e.preventDefault()
                    $('.audio').html(`<audio controls class="audioelement">
        <source src="${data[0].phonetics[0].audio}" type="audio/ogg">
        Your browser does not support the audio tag.
        </audio>`)
                })

            }

            if (data[0].meanings[0].definitions[0].definition) {
                $('.DictDefinition').html(`means :  <br> ${data[0].meanings[0].definitions[0].definition}`)
            }


            if (data[0].meanings[0].partOfSpeech) {
                $('.DictPartOfSpeech').text(data[0].meanings[0].partOfSpeech)
            }

            if (data[0].meanings[0].synonyms[0]) {
                $('.Dictsynonyms').html(`Synonym :  ${data[0].meanings[0].synonyms[0]}`)
            }



        })
            .fail(function (error) {
                $('.DictWord').text("Word can't be found")
                console.log("Error In fetching", error)
            })
    }

    $('.wordsearch').submit(function (e) {
        e.preventDefault()

        DictApi()

        if (!$('firstsubdiv').hasClass('move2')) {

            setTimeout(() => {

                $('.secondsubsubdiv').removeClass('displaynone')
                $('.firstsubsubdiv').addClass('displaynone')
            }, 800);


            $('.firstsubdiv').addClass('move2')
            if ($('.firstsubdiv').hasClass('move2')) {
                $('.bookopen').text('Close Dictionary')
            }
            else {
                $('.bookopen').text('Open Dictionary')

            }
        }

    })

    $('.bookopen').click(function (e) {
        e.preventDefault()

        setTimeout(() => {

            $('.secondsubsubdiv').toggleClass('displaynone')
            $('.firstsubsubdiv').toggleClass('displaynone')
        }, 800);

        $('.firstsubdiv').toggleClass('move2')

        if ($('.firstsubdiv').hasClass('move2')) {
            $('.bookopen').text('Close Dictionary')
        }
        else {
            $('.bookopen').text('Open Dictionary')

        }
    })

    DictApi()

})




