import { NewsQueueEntry } from './news-queue-entry.model';
import { NewsWatch } from './news-watch.model';
import { NewsArticle } from './news-article.model';
import { NewsFeed } from './news-feed.model';
import { NewsLockedTo } from './news-locked-to.model';

export class NewsObject {
  feedItemQueue: NewsQueueEntry;
  watch: NewsWatch;
  article: NewsArticle;
  feed: NewsFeed;
  lockedTo: NewsLockedTo;
}
