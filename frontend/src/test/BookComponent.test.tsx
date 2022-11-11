import React from 'react';
import { render, screen } from '@testing-library/react';
import BookComponent from '../components/bookComponent/BookComponent';
import { BookModel } from '../backend/models/book/bookResponseModel';
import { Provider } from 'react-redux';
import store from '../hooks/store';
import { BrowserRouter } from 'react-router-dom';
import axios from "axios";
import MockAdapter from 'axios-mock-adapter';

describe('Book component testing', function() {
  it('Test if title is equal mock', async function() {
    process.env.REACT_APP_BOOKS_API_URL = 'https://www.googleapis.com/books';

    const book: BookModel = {
        id: 'ZDgQCwAAQBAJ',
        volumeInfo: {
            title: 'Harry Potter e o Cálice de Fogo',
            authors: ["J.K. Rowling"],
            publisher: "Pottermore Publishing",
            publishedDate: "2015-12-08",
            description: "<p>Haverá três tarefas, espaçadas durante o ano letivo, que servirão para testar os campeões de diferentes maneiras... sua perícia em magia, sua coragem, seus poderes de dedução e, naturalmente, sua capacidade de enfrentar o perigo.'<br><br>O Torneio Tribruxo será realizado em Hogwarts. Apenas bruxos acima dos dezessete anos de idade podem se inscrever - mas isso não impede que Harry sonhe em vencer a competição. E então, no Dia das Bruxas, quando o Cálice de Fogo faz sua seleção, Harry se surpreende ao ver que seu nome é um dos que a taça mágica escolhe. Ele terá de enfrentar tarefas mortais, dragões e bruxos das trevas, mas com a ajuda de seus melhores amigos, Ron e Hermione, talvez ele consiga sair dessa - vivo!</p>",
            industryIdentifiers: [{
                "type": "ISBN_10",
                "identifier": "1781103712"
            },
            {
                "type": "ISBN_13",
                "identifier": "9781781103715"
            }],
            pageCount: 535,
            printType: 'BOOK',
            categories: [
                "Juvenile Fiction / Action & Adventure / General",
                "Fiction / Action & Adventure",
                "Fiction / Fantasy / Contemporary",
                "Juvenile Fiction / Fantasy & Magic",
                "Young Adult Fiction / Action & Adventure / General",
                "Young Adult Fiction / Fantasy / Wizards & Witches",
                "Young Adult Fiction / School & Education / Boarding School & Prep School",
                "Fiction / Fantasy / General",
                "Juvenile Fiction / School & Education"
            ],
            averageRating: 4.5,
            ratingsCount: 220,
            imageLinks: {
                thumbnail: "http://books.google.com/books/publisher/content?id=ZDgQCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE735R3dGj5rFfpqqWj16EvJSXKG3PFpNCfLZvp8iszL9LcPtKpN0lEF_A1n6D02HWtYpjMEIgtJtuptxvtjMYb9KowCz-3IOSE3LR0mHgxRzZZckZL8dPnR5-OEePyuDZ3Xft72K&source=gbs_api",
            },
            language: 'pt-BR',
            previewLink: "http://books.google.com.br/books?id=ZDgQCwAAQBAJ&hl=&source=gbs_api",
        },
        saleInfo: {
            country: 'BR',
            saleability: 'FOR_SALE',
            isEbook: false,
            listPrice: {
                amount: 24.9,
                currencyCode: "BRL"
            },
            buyLink: "https://play.google.com/store/books/details?id=ZDgQCwAAQBAJ&rdid=book-ZDgQCwAAQBAJ&rdot=1&source=gbs_api",
        },
        accessInfo: {
            pdf: {
                isAvailable: true,
                acsTokenLink: "http://books.google.com.br/books/download/Harry_Potter_e_o_C%C3%A1lice_de_Fogo-sample-pdf.acsm?id=ZDgQCwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
            }
        }
    }

    const bookId = book.id;
    var mock = new MockAdapter(axios);
    mock.onGet(`${process.env.REACT_APP_BOOKS_API_URL}/v1/volumes/${bookId}`).reply(200, book);

    render(
        <Provider store={store}>
            <BrowserRouter>
                <BookComponent 
                    book={book} />
            </BrowserRouter>
        </Provider>
    );
           
    expect(screen.getByTestId('book-component-title')).toHaveTextContent('Harry Potter e o Cálice de Fogo');
  });
});