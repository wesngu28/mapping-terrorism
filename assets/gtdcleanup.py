import pandas as pd
from google.colab import drive

drive.mount('/content/gdrive')

gtd = pd.read_csv('/content/gdrive/My Drive/Colab Notebooks/data/GTD.csv')

gtd.head()

# remove all rows where there was doubt of terrorism attack
gtd_no_doubt = gtd[gtd.doubtterr == 0]

# remove all entries with no deaths, wounded, property damage, or hostages
gtd_only_damage = gtd_no_doubt[(gtd_no_doubt.nkill > 0) | (gtd_no_doubt.nwound > 0) | (gtd_no_doubt.property == 1) | (gtd_no_doubt.nhostkid > 0)]

# remove all entries without sources
gtd_only_sources = gtd_only_damage[(pd.notna(gtd_only_damage.scite1)) | (pd.notna(gtd_only_damage.scite2)) | (pd.notna(gtd_only_damage.scite3))]
len(gtd_only_sources.index)

# filter the final columns
gtd_filtered = gtd_only_sources.filter(items=['iyear', 'imonth', 'iday', 'country_txt', 'city', 'latitude', 'longitude', 
                                              'attacktype1_txt', 'targtype1_txt', 'target1', 'gname', 'weaptype1_txt',
                                              'nkill', 'nwound', 'property', 'propextent_txt', 'nhostkid', 'ransom',
                                              'scite1', 'scite2', 'scite3', 'dbsource'])
gtd_filtered.head()

gtd_filtered.to_csv(r'/content/gdrive/My Drive/Colab Notebooks/data/GTD_filtered.csv', index = False, header=True)
