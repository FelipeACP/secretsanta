import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "../components/Layout";
import { PostCard } from "../components/PostCard";
import { PageTransition } from "../components/PageTransition";
import { fetchGiftSuggestions } from "../utils/googleSheets";
import { GiftSuggestion } from "../types";
import { ShoppingCart } from "@phosphor-icons/react";

export function GiftSuggestions() {
  const { t } = useTranslation();
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <PageTransition>
      <Layout>
        <div className="lg:flex-[6_6_0%]">
          <PostCard>
            <h1 className="text-3xl font-bold text-red-700 mb-6 font-['Cherry_Swash']">
              {t("giftSuggestions.pageTitle")}
            </h1>

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

            {!loading && !error && suggestions.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-red-100 border-b-2 border-red-700">
                      <th className="text-left p-3 font-semibold text-red-800">
                        {t("giftSuggestions.tablePerson")}
                      </th>
                      <th className="text-left p-3 font-semibold text-red-800">
                        {t("giftSuggestions.tableGift")}
                      </th>
                      <th className="text-left p-3 font-semibold text-red-800">
                        {t("giftSuggestions.tableDetails")}
                      </th>
                      <th className="text-left p-3 font-semibold text-red-800">
                        {t("giftSuggestions.tableLink")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {suggestions.map((suggestion, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-red-50 transition-colors"
                      >
                        <td className="p-3 font-semibold text-gray-800">
                          {suggestion.person}
                        </td>
                        <td className="p-3">{suggestion.gift}</td>
                        <td className="p-3 text-sm text-gray-600">
                          {suggestion.details || "-"}
                        </td>
                        <td className="p-3">
                          {suggestion.link ? (
                            <a
                              href={suggestion.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
                            >
                              <ShoppingCart size={16} weight="bold" />
                              {t("giftSuggestions.buyButton")}
                            </a>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </PostCard>
        </div>
      </Layout>
    </PageTransition>
  );
}
