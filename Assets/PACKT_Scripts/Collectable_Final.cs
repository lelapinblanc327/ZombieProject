using UnityEngine;
using System.Collections;

public class Collectable_Final : MonoBehaviour {
	public AudioClip sound;
	public int increase = 1;
	public GameObject playerObj;
	public GameObject pickingCamera;
	public Transform playerCamera;
	public bool triggered = false;
	public Transform headBone;
	public float objectWeight = 0.25f;

	public PlayerStatus_Final playerState;
	public FPSAnimation_Final playerAnim;

	void Start()
	{
		playerState = playerObj.GetComponent<PlayerStatus_Final>();
		playerAnim = playerObj.GetComponent<FPSAnimation_Final>();
	}

	void OnTriggerEnter (Collider other)
	{
		if(triggered == false)
		{
			triggered = true;
			playerState.SendMessage ("AddHealth", increase);
			playerAnim.SendMessage ("Pick", objectWeight);

			if (sound)
			{
				AudioSource.PlayClipAtPoint(sound, transform.position);
			}
		}
		
	}

	void RunCam()
	{
		Transform pickTrans = transform;
		GameObject addCamObj;
		addCamObj = Instantiate (pickingCamera, headBone.position, playerCamera.rotation)as GameObject;
		addCamObj.transform.parent = headBone.transform;
		addCamObj.transform.GetChild (0).SendMessage ("SentTarget", pickTrans);
		Invoke ("Remove", 0.5f);
	}

	void Remove()
	{
		Debug.Log ("You got it");
		triggered = false;
		Destroy (gameObject);
	}
}
