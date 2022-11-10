import React, { useEffect, useLayoutEffect, useState } from 'react'
import PageAnimation from '../../../components/animation/pageAnimation.js'
import SearchBar from '../../../components/searchBar/SearchBar'
import './HomeScreen.css'
import AdventureImage from '../../../assets/categoriesIcons/Adventure.png';
import BiographyImage from '../../../assets/categoriesIcons/Biography.png';
import SocialScienceImage from '../../../assets/categoriesIcons/SocialScience.png';
import TaleImage from '../../../assets/categoriesIcons/Tale.png';
import ChronicImage from '../../../assets/categoriesIcons/Chronic.png';
import DramaImage from '../../../assets/categoriesIcons/Drama.png';
import FantasyImage from '../../../assets/categoriesIcons/Fantasy.png';
import FictionImage from '../../../assets/categoriesIcons/Fiction.png';
import ComicBookImage from '../../../assets/categoriesIcons/ComicBook.png';
import HistoricalImage from '../../../assets/categoriesIcons/Historical.png';
import HorrorImage from '../../../assets/categoriesIcons/Horror.png';
import LanguageArtsDisciplinesImage from '../../../assets/categoriesIcons/LanguageArtsDisciplines.png';
import EnglishLanguageImage from '../../../assets/categoriesIcons/EnglishLanguage.png';
import RomanceImage from '../../../assets/categoriesIcons/Romance.png';
import { HomeCategoryModel } from '../model/HomeCategoryModel';
import CategoryComponent from '../../../components/categoryComponent/CategoryComponent';
import Checkbox from '@mui/material/Checkbox';
import { FormGroup, FormControlLabel, Pagination } from '@mui/material';
import ComboBox, { ComboBoxValueProps } from '../../../components/comboBox/ComboBox';
import BookComponent from '../../../components/bookComponent/BookComponent';
import { useTypedSelector } from '../../../hooks/useTypeSelector.js';
import { useDispatch } from 'react-redux';
import { fetchBooksByQuery } from '../../../backend/actions/bookActions';
import { motion } from 'framer-motion';
import { formatNumber } from '../../../utils/FormatterValues';
import BookComponentSkeleton from '../../../components/bookComponent/BookComponentSkeleton';
import AlertModal from '../../../components/alertModal/AlertModal';
import { ErrorResponseModel } from '../../../backend/models/error/ErrorResponseModel.js';
import Lottie from 'react-lottie';
import booksSearchJson from '../../../assets/lotties/books-search.json';
import UseWindowDimensions from '../../../utils/UseWindowDimensions';
import ISO6391 from 'iso-639-1';

export default function HomeScreen() {
  const dispatch = useDispatch();

  const categories = useState<HomeCategoryModel[]>([
    new HomeCategoryModel('Aventura', AdventureImage, 'Adventure'),
    new HomeCategoryModel('Biografia', BiographyImage, 'Biography'),
    new HomeCategoryModel('Ciências Sociais', SocialScienceImage, 'Social Science'),
    new HomeCategoryModel('Conto', TaleImage, 'Tale'),
    new HomeCategoryModel('Crônica', ChronicImage, 'Chronic'),
    new HomeCategoryModel('Drama', DramaImage, 'Drama'),
    new HomeCategoryModel('Fantasia', FantasyImage, 'Fantasy'),
    new HomeCategoryModel('Ficção', FictionImage, 'Fiction'),
    new HomeCategoryModel('HQs', ComicBookImage, 'Comic Book'),
    new HomeCategoryModel('Histórico', HistoricalImage, 'Historical'),
    new HomeCategoryModel('Terror', HorrorImage, 'Horror'),
    new HomeCategoryModel('Linguagem Artística', LanguageArtsDisciplinesImage, 'Language Arts & Disciplines'),
    new HomeCategoryModel('Língua Inglesa', EnglishLanguageImage, 'English Language'),
    new HomeCategoryModel('Romance', RomanceImage, 'Romance'),
  ]);
  const [categorySelected, setCategorySelected] = useState<HomeCategoryModel>();
  const [isDownloadAvailable, setIsDownloadAvailable] = useState<boolean>();
  const filtersVolumeByTypeAndPriceList = useState<ComboBoxValueProps[]>([
    new ComboBoxValueProps('', 'Selecionar'),
    new ComboBoxValueProps('free-ebooks', 'Livros grátis'),
    new ComboBoxValueProps('paid-ebooks', 'Livros pagos'),
    new ComboBoxValueProps('ebooks', 'Livros digitais'),
  ]);
  const [filterVolumeByTypeAndPriceSelected, setFilterVolumeByTypeAndPriceSelected] = useState<ComboBoxValueProps>();
  const maxResultsList = useState<ComboBoxValueProps[]>([
    new ComboBoxValueProps('10', '10'),
    new ComboBoxValueProps('20', '20'),
    new ComboBoxValueProps('30', '30'),
    new ComboBoxValueProps('40', '40'),
  ]);  
  const [maxResultsSelected, setMaxResultsSelected] = useState<ComboBoxValueProps>(new ComboBoxValueProps('10', '10'));
  const orderByList = useState<ComboBoxValueProps[]>([
    new ComboBoxValueProps('relevance', 'Relevância'),
    new ComboBoxValueProps('newest', 'Mais novo'),
  ]);  
  const [orderBySelected, setOrderBySelected] = useState<ComboBoxValueProps>(new ComboBoxValueProps('relevance', 'Relevância'));
  const printTypelist = useState<ComboBoxValueProps[]>([
    new ComboBoxValueProps('all', 'Todos'),
    new ComboBoxValueProps('books', 'Livros'),
    new ComboBoxValueProps('magazines', 'Revistas'),
  ]);  
  const [printTypeSelected, setPrintTypeSelected] = useState<ComboBoxValueProps>(new ComboBoxValueProps('all', 'Relevância'));
  const [languagesList, setLanguagesList] = useState<ComboBoxValueProps[]>([]);
  const [languageSelected, setLanguageSelected] = useState<ComboBoxValueProps>();
  const [searchBarText, setSearchBarText] = useState<string>('ReactJS');
  const [searchBarTextChange, setSearchBarTextChange] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [error, setError] = useState<ErrorResponseModel>();
  const [showError, setShowError] = useState<boolean>(false);

  const booksQuery = useTypedSelector(state => state.booksQuery);
  const { data: booksQueryData, loading: booksQueryLoading, error: booksQueryError } = booksQuery;

  const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: booksSearchJson,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      },
  };

  const { width } = UseWindowDimensions();
  const isMobile = width <= 768;

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (searchBarText !== '' || (categorySelected)) {
      dispatch(fetchBooksByQuery(searchBarText, (formatNumber(maxResultsSelected.value) * page + 1), categorySelected?.type, isDownloadAvailable, filterVolumeByTypeAndPriceSelected?.value, maxResultsSelected.value, printTypeSelected.value, orderBySelected.value, languageSelected?.value));
    }
  }, [dispatch, searchBarText, page, categorySelected, isDownloadAvailable, filterVolumeByTypeAndPriceSelected, maxResultsSelected, printTypeSelected, orderBySelected, languageSelected]);

  useEffect(() => {
    if (categorySelected && !searchBarTextChange) {
      setSearchBarText('');
    }
  }, [categorySelected, searchBarTextChange]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTotalPages(booksQueryData ? (booksQueryData.totalItems/formatNumber(maxResultsSelected.value)) : 0);
  }, [booksQueryData, maxResultsSelected]);

  useEffect(() => {
    if (booksQueryError) {
      setShowError(true);
      setError(booksQueryError);
    }
  }, [booksQueryError]);

  useEffect(() => {
    var list: ComboBoxValueProps[] = [];
    list.push(new ComboBoxValueProps('', 'Selecionar idioma'));
    ISO6391.getAllCodes().forEach((code) => {
      list.push(new ComboBoxValueProps(code, ISO6391.getName(code)));
    });
    setLanguagesList(list);
  }, []);

  return (
    <PageAnimation>
        <div className='home-screen-background'>
            <div className='home-screen-content'>
                {/* Categories */}
                <div className='home-screen-categories'>
                  { categories[0].map((category) => {
                    return (
                      <div className='home-screen-category-item' key={category.type}>
                        <CategoryComponent 
                          category={category}
                          isCategorySelected={categorySelected?.type === category.type}
                          onClick={() => {
                            if (category.type === categorySelected?.type) {
                              setCategorySelected(undefined);
                            } else {
                              setCategorySelected(category)
                            }
                          }} />
                      </div>
                    )
                  })}
                </div>

                {/* Content body */}
                <div className='home-screen-content-body'>
                  {/* Filters */}
                  <div className='home-screen-filters'>
                    <label className='title3Bold'>Filtros</label>
                    <div className='home-screen-filters-divider' />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox value={isDownloadAvailable} onChange={e => setIsDownloadAvailable(e.target.checked)} />} label="Baixável" />
                        <div className='home-screen-filters-book-type'>
                          <ComboBox 
                            options={filtersVolumeByTypeAndPriceList[0]} 
                            value={filterVolumeByTypeAndPriceSelected?.value}
                            placeholder='Tipo de livro'
                            onChange={(value: ComboBoxValueProps) => {
                              if (value.value === '') {
                                setFilterVolumeByTypeAndPriceSelected(undefined);
                              } else {
                                setFilterVolumeByTypeAndPriceSelected(value);
                              }
                            }} />
                        </div>
                        <label className='subtitle3Bold'>Resultados por página:</label>
                        <ComboBox 
                            options={maxResultsList[0]} 
                            value={maxResultsSelected?.value}
                            placeholder='Resultados por página'
                            onChange={(value: ComboBoxValueProps) => {
                              setMaxResultsSelected(value);
                            }} />
                        <label className='subtitle3Bold home-screen-filters-file-type'>Tipo de arquivo:</label>
                        <ComboBox 
                            options={printTypelist[0]} 
                            value={printTypeSelected?.value}
                            onChange={(value: ComboBoxValueProps) => {
                              setPrintTypeSelected(value);
                            }} />
                        <div className='home-screen-filters-combobox-language'>
                          <ComboBox 
                              options={languagesList} 
                              placeholder='Selecionar idioma'
                              value={languageSelected?.value}
                              onChange={(value: ComboBoxValueProps) => {
                                setLanguageSelected(value);
                              }} />
                        </div>
                    </FormGroup>
                  </div>

                  {/* Books List body */}
                  <div className='home-screen-books-body'>
                      <div className='home-screen-books-order-top'>
                        <div className='home-screen-books-order-search-bar'>
                          <SearchBar 
                          onSearch={(text: string) => {
                            setSearchBarTextChange(true);
                            setSearchBarText(text);
                          }} />
                        </div>
                        <div className='home-screen-books-order-combobox'>
                          <ComboBox 
                              options={orderByList[0]} 
                              value={orderBySelected?.value}
                              placeholder='Ordenar por'
                              onChange={(value: ComboBoxValueProps) => {
                                setOrderBySelected(value);
                              }} />
                        </div>
                      </div>
                      <div className='home-screen-books-list'>
                        { booksQueryData && booksQueryData.items ? booksQueryData.items?.map((book, index) => {
                          return (
                            <motion.div 
                                  key={`home-screen-books-${index}`}
                                  initial={{ opacity: index <= 15 ? 0 : 1, scale: index <= 15 ? 0.9 : 1 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{
                                  duration: index <= 15 ? (index + 1) * (index <= 4 ? 0.2 : 0.1) : 0,
                                  ease: "easeInOut",
                                  }}>
                              <div className='home-screen-books-list-item' key={`book-${book.id}`}>
                                <BookComponent book={book} />
                              </div>
                            </motion.div>
                          )
                        }) : booksQueryLoading ? (
                          <>
                            {[...Array(10)].map((i, index) => {
                                return (
                                    <motion.div 
                                        key={`home-screen-books-empty-${index}`}
                                        initial={{ opacity: index <= 15 ? 0 : 1, scale: index <= 15 ? 0.9 : 1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                        duration: index <= 15 ? (index + 1) * 0.2 : 0,
                                        ease: "easeInOut",
                                        }}>
                                        <div key={`${index}-home-screen-books-empty`} className='home-screen-books-list-item'>
                                          <BookComponentSkeleton />
                                        </div>
                                    </motion.div>
                                );
                            }
                            )}
                          </>
                        ) : (
                          <div className='home-screen-books-empty-background'>
                            <Lottie options={defaultOptions}
                              isClickToPauseDisabled={true}
                              height={isMobile ? '200px' : '300px'}
                              width={isMobile ? '300px' : '400px'}
                              style={{
                                marginTop: isMobile ? '80px' : '3%',
                              }}
                              />
                              <label className='title3Bold secondaryTextLight'>Nenhum livro foi encontrado</label>
                          </div>
                        )}
                      </div>

                      {/* Pagination */}
                      { booksQueryData && booksQueryData.items && (
                        <Pagination 
                          className='home-screen-books-list-pagination' 
                          count={totalPages}
                          page={page}
                          color='primary'
                          onChange={(e, page) => setPage(page)} />
                      )}
                  </div>
                  

                </div>

            </div>
        </div>

        <AlertModal
          error={error}
          show={showError}
          button1Text='OK'
          button1Click={() => {
            setShowError(false);
          }}
        />
    </PageAnimation>
  )
}
