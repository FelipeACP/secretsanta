import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PostCard } from "../components/PostCard";
import { PageTransition } from "../components/PageTransition";
import { fetchGiftSuggestions } from "../utils/googleSheets";
import { GiftSuggestion } from "../types";
import { ShoppingCart, MagnifyingGlass, X } from "@phosphor-icons/react";

export function GiftSuggestions() {
  const { t } = useTranslation();
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadSuggestions = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchGiftSuggestions();
      setSuggestions(data);
    } catch (err) {
      console.error("Error fetching gift suggestions:", err);
      setError(t("giftSuggestions.error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuggestions();
  }, []);

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.person.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="min-h-screen flex lg:items-center justify-center p-4 lg:overflow-hidden">
        <div className="container mx-auto max-w-5xl">
          <div className="my-12 md:my-16 flex flex-col justify-around lg:flex-row gap-12 md:gap-16">
            <div className="lg:flex-[6_6_0%] w-full min-w-0">
              <PostCard>
                <h1 className="text-2xl sm:text-3xl font-bold text-red-700 mb-4 sm:mb-6 font-['Cherry_Swash'] break-words">
                  {t("giftSuggestions.pageTitle")}
                </h1>

                {/* Search Input */}
                {!loading && !error && suggestions.length > 0 && (
                  <div className="mb-6">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlass size={20} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={
                          t("giftSuggestions.searchPlaceholder") ||
                          "Buscar por nome..."
                        }
                        className="w-full pl-10 pr-10 py-3 border-2 border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      />
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm("")}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                          aria-label="Limpar busca"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>
                    {searchTerm && (
                      <p className="mt-2 text-sm text-gray-600">
                        {filteredSuggestions.length === 0
                          ? t("giftSuggestions.noResults") ||
                            "Nenhum resultado encontrado"
                          : `${filteredSuggestions.length} ${
                              filteredSuggestions.length === 1
                                ? "resultado"
                                : "resultados"
                            }`}
                      </p>
                    )}
                  </div>
                )}

                {loading && (
                  <div className="text-center py-8">
                    <p className="text-lg">{t("giftSuggestions.loading")}</p>
                  </div>
                )}

                {error && !loading && (
                  <div className="text-center py-8">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button
                      onClick={loadSuggestions}
                      className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                      {t("giftSuggestions.retryButton")}
                    </button>
                  </div>
                )}

                {!loading && !error && suggestions.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-600">
                      {t("giftSuggestions.emptyList")}
                    </p>
                  </div>
                )}

                {!loading && !error && filteredSuggestions.length > 0 && (
                  <div className="space-y-3 sm:space-y-4">
                    {filteredSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-white to-red-50 border-2 border-red-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 hover:border-red-300"
                      >
                        <div className="flex flex-col gap-3 min-w-0">
                          {/* Person Name */}
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">
                              {t("giftSuggestions.tablePerson")}
                            </span>
                            <span className="text-lg font-bold text-gray-900 break-words">
                              {suggestion.person}
                            </span>
                          </div>

                          {/* Gift */}
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">
                              {t("giftSuggestions.tableGift")}
                            </span>
                            <span className="text-base text-gray-800 break-words">
                              {suggestion.gift}
                            </span>
                          </div>

                          {/* Details */}
                          {suggestion.details && (
                            <div className="flex flex-col gap-1">
                              <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">
                                {t("giftSuggestions.tableDetails")}
                              </span>
                              <span className="text-sm text-gray-600 break-words">
                                {suggestion.details}
                              </span>
                            </div>
                          )}

                          {/* Buy Button */}
                          {suggestion.link && (
                            <div className="mt-1 pt-3 border-t border-red-200">
                              <a
                                href={suggestion.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg text-sm"
                              >
                                <ShoppingCart size={18} weight="bold" />
                                <span className="truncate">
                                  {t("giftSuggestions.buyButton")}
                                </span>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!loading &&
                  !error &&
                  searchTerm &&
                  filteredSuggestions.length === 0 &&
                  suggestions.length > 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-600">
                        {t("giftSuggestions.noResults") ||
                          "Nenhum resultado encontrado para sua busca."}
                      </p>
                    </div>
                  )}
              </PostCard>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
