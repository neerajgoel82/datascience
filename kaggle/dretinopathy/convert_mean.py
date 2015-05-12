
import numpy as np
import sys

caffe_root = '/home/neeraj/Softwares/caffe_cpu/'  # this file is expected to be in {caffe_root}/examples
sys.path.insert(0, caffe_root + 'python')

import caffe

if len(sys.argv) != 3:
	print "Usage: python convert_mean.py proto.mean out.npy"
	sys.exit()

blob = caffe.proto.caffe_pb2.BlobProto()
data = open( sys.argv[1] , 'rb' ).read()
blob.ParseFromString(data)
arr = np.array( caffe.io.blobproto_to_array(blob) )
out = arr[0]
np.save( sys.argv[2] , out )