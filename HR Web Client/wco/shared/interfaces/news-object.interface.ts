import { NewsArticle } from '../models/news-article.model';
import { NewsFeed } from '../models/news-feed.model';
import { NewsLockedTo } from '../models/news-locked-to.model';
import { NewsQueueEntry } from '../models/news-queue-entry.model';
import { NewsWatch } from '../models/news-watch.model';

export interface INewsObject {
  queueEntry: NewsQueueEntry;
  watch: NewsWatch;
  article: NewsArticle;
  feed: NewsFeed;
  lockedTo: NewsLockedTo;
}
